const pool = require("../config/db")
const crypto = require("crypto")
const { sendEmail } = require("../utils/mailer")
const { getEmailTemplate } = require("../utils/emailTemplates")
const { sendWhatsAppMessage } = require("../utils/ultramsg")

/**
 * orderController.js
 * Manages all order-related operations including creation, 
 * payment integration (eSewa), status updates, and email notifications.
 */

/**
 * Helper: Sends a standard order confirmation email.
 */
const sendOrderConfirmationEmail = async (orderId, customer_name, email, address, city, total, items) => {
    const itemsHtml = items.map(item => `
        <tr>
            <td>${item.name}</td>
            <td>${item.quantity}</td>
            <td>NPR ${item.price}</td>
            <td>NPR ${item.price * item.quantity}</td>
        </tr>
    `).join('');

    const orderEmailContent = getEmailTemplate(
        "Order Confirmation",
        `<p>Dear ${customer_name},</p>
         <p>Thank you for your order! We've received your request and it's now being processed.</p>
         <p><b>Order ID:</b> #${orderId}</p>
         <p><b>Shipping Address:</b> ${address}, ${city}</p>
         
         <table class="order-table">
            <thead>
                <tr>
                    <th>Product</th>
                    <th>Qty</th>
                    <th>Price</th>
                    <th>Total</th>
                </tr>
            </thead>
            <tbody>
                ${itemsHtml}
            </tbody>
         </table>
         
         <div style="text-align: right; font-weight: 800; font-size: 18px; color: #2E6F40; margin-top: 10px;">
            Grand Total: NPR ${total}
         </div>
         <p>We'll notify you once your order is shipped!</p>`
    );

    await sendEmail(email, `Order Placed Successfully - #${orderId}`, orderEmailContent);
}

/**
 * Creates a new order and initiates payment gateway if necessary.
 */
exports.createOrder = async (req, res) => {
    try {
        const {
            customer_name,
            email,
            phone,
            address,
            city,
            total,
            shipping_charge = 0,
            items,
            payment_method = 'COD'
        } = req.body

        // Initial payment status based on method
        const payment_status = (payment_method === 'eSewa') ? 'Pending' : 'Unpaid';

        // 1. Insert Core Order Data
        const orderResult = await pool.query(
            `INSERT INTO orders
            (customer_name, email, phone, address, city, total, payment_method, payment_status, shipping_charge)
            VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9)
            RETURNING id`,
            [customer_name, email, phone, address, city, total, payment_method, payment_status, shipping_charge]
        )

        const orderId = orderResult.rows[0].id

        // 2. Insert Line Items
        for (const item of items) {
            await pool.query(
                `INSERT INTO order_items
                (order_id, product_id, name, price, quantity, image_url)
                VALUES($1, $2, $3, $4, $5, $6)`,
                [
                    orderId,
                    item.id,
                    item.name,
                    item.price,
                    item.quantity,
                    item.image || item.image_url
                ]
            )
        }

        // 3. Emit Socket Event for Real-time Admin Notification
        const io = req.app.get('io')
        if (io) {
            io.emit('new_order', { orderId, customer_name, total })
        }

        // 4. Send Order Confirmation Email (Common for both methods)
        await sendOrderConfirmationEmail(orderId, customer_name, email, address, city, total, items);

        // 4.1 Send WhatsApp Notification to Admin
        const itemsText = items.map(item => {
            const imgFile = item.image || item.image_url;
            const imgUrl = imgFile ? 
                (imgFile.startsWith("http") ? imgFile : `https://rk-life-science.onrender.com/uploads/${imgFile}`) 
                : "No image provided";
            return `*Product:* ${item.name}\n*Quantity:* ${item.quantity}\n*Rate:* NPR ${item.price}\n*Image:* ${imgUrl}`;
        }).join('\n\n');

        const waMessage = `*New Order Placed!* 🛍️\n\n` +
            `*Order ID:* #${orderId}\n` +
            `*Customer Name:* ${customer_name}\n` +
            `*Payment Mode:* ${payment_method}\n\n` +
            `*Order Details:*\n${itemsText}\n\n` +
            `*Total Amount:* NPR ${total}\n\n` +
            `Please check the admin dashboard to process this order.`;
        
        // Do not block the request if WhatsApp fails, fire and forget or await
        await sendWhatsAppMessage(process.env.ADMIN_PHONE || '9779768771762', waMessage);

        // 5. Handle eSewa Payment Integration
        if (payment_method === 'eSewa') {
            const transaction_uuid = `${orderId}-${Date.now()}`;
            const productCode = process.env.ESEWA_PRODUCT_CODE || "EPAYTEST";
            const signatureString = `total_amount=${total},transaction_uuid=${transaction_uuid},product_code=${productCode}`;
            const secretKey = process.env.ESEWA_SECRET_KEY || "8gBm/:&EnhH.1/q";
            const hash = crypto.createHmac('sha256', secretKey).update(signatureString).digest('base64');

            return res.json({
                success: true,
                orderId,
                payment_method: 'eSewa',
                esewaConfig: {
                    amount: total,
                    tax_amount: "0",
                    total_amount: total,
                    transaction_uuid,
                    product_code: productCode,
                    product_service_charge: "0",
                    product_delivery_charge: "0",
                    success_url: `${process.env.FRONTEND_URL}/checkout/success`,
                    failure_url: `${process.env.FRONTEND_URL}/checkout/failure`,
                    signed_field_names: "total_amount,transaction_uuid,product_code",
                    signature: hash
                }
            })
        }

        res.json({
            success: true,
            orderId
        })

    } catch (err) {
        res.status(500).json({
            error: err.message
        })
    }
}

/**
 * Retrieves all orders for the admin dashboard.
 */
exports.getOrders = async (req, res) => {
    try {
        const result = await pool.query(
            `SELECT * FROM orders ORDER BY created_at DESC`
        )
        res.json(result.rows)
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}

/**
 * Retrieves detailed information for a single order.
 */
exports.getOrderDetails = async (req, res) => {
    try {
        const { id } = req.params
        const order = await pool.query(`SELECT * FROM orders WHERE id=$1`, [id])
        const items = await pool.query(`SELECT * FROM order_items WHERE order_id=$1`, [id])

        res.json({
            order: order.rows[0],
            items: items.rows
        })
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}

/**
 * Updates the status of an order.
 * Automatically marks as 'Paid' if the status is set to 'Delivered'.
 */
exports.updateOrderStatus = async (req, res) => {
    try {
        const { id } = req.params
        const { status, payment_status } = req.body

        let query = `UPDATE orders SET status=$1 WHERE id=$2`
        let params = [status, id]

        // Handle explicit payment status update (e.g. from eSewa success)
        if (payment_status) {
            query = `UPDATE orders SET status=$1, payment_status=$2 WHERE id=$3`
            params = [status, payment_status, id]
        } 
        // Auto-mark COD as Paid upon delivery
        else if (status === 'Delivered') {
            query = `UPDATE orders SET status=$1, payment_status='Paid' WHERE id=$2`
        }

        await pool.query(query, params)

        // 1. Fetch current order info to get customer email
        const orderResult = await pool.query("SELECT * FROM orders WHERE id=$1", [id]);
        const order = orderResult.rows[0];

        // 2. Send Delivery Confirmation Email if applicable
        if (status === 'Delivered') {
            const deliveredEmailContent = getEmailTemplate(
                "Order Delivered",
                `<p>Dear ${order.customer_name},</p>
                 <p>Great news! Your order <b>#${id}</b> has been successfully delivered.</p>
                 <p>We hope you enjoy your purchase from R.K. Life Science. Thank you for choosing us for your healthcare needs!</p>
                 <p>If you have any questions or feedback, feel free to reply to this email.</p>`
            );
            await sendEmail(order.email, `Order Delivered - #${id}`, deliveredEmailContent);

            // Send WhatsApp Delivery Notification
            const waDeliveryMessage = `Hello ${order.customer_name}, thank you for shopping with us! 🌟\n\n` + 
                `Your order #${id} has been delivered successfully. ` + 
                `Please visit again to explore more amazing products!\n\n` + 
                `- RK Life Science`;
            await sendWhatsAppMessage(order.phone, waDeliveryMessage);
        }

        const io = req.app.get('io')
        if (io) {
            io.emit('order_status_updated', { orderId: id, status })
        }

        res.json({ success: true, message: "Order status updated" })
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}

/**
 * Cancels a pending order.
 */
exports.cancelOrder = async (req, res) => {
    try {
        const { id } = req.params;
        
        const orderResult = await pool.query("SELECT * FROM orders WHERE id=$1", [id]);
        if (orderResult.rows.length === 0) return res.status(404).json({ error: "Order not found" });

        const order = orderResult.rows[0];
        if (order.status !== 'Pending') return res.status(400).json({ error: "Only pending orders can be cancelled" });

        await pool.query("UPDATE orders SET status='Cancelled' WHERE id=$1", [id]);

        // Send Cancellation Email
        const cancellationEmailContent = getEmailTemplate(
            "Order Cancelled",
            `<p>Dear ${order.customer_name},</p>
             <p>As requested, your order <b>#${id}</b> has been cancelled.</p>
             <p>If this was a mistake or you have any concerns, please contact our support team immediately.</p>
             <p>We hope to serve you again in the future.</p>`
        );
        await sendEmail(order.email, `Order Cancelled - #${id}`, cancellationEmailContent);

        const io = req.app.get('io')
        if (io) {
            io.emit('order_status_updated', { orderId: id, status: 'Cancelled' })
        }

        res.json({ success: true, message: "Order cancelled successfully" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}