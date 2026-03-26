const pool = require("../config/db")
const crypto = require("crypto")
const { sendEmail } = require("../utils/mailer")
const { getEmailTemplate } = require("../utils/emailTemplates")

/**
 * orderController.js
 * Manages all order-related operations including creation, 
 * payment integration (eSewa), status updates, and email notifications.
 */

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

        // 3. Handle eSewa Payment Integration
        if (payment_method === 'eSewa') {
            const transaction_uuid = `${orderId}-${Date.now()}`;
            const signatureString = `total_amount=${total},transaction_uuid=${transaction_uuid},product_code=EPAYTEST`;
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
                    product_code: "EPAYTEST",
                    product_service_charge: "0",
                    product_delivery_charge: "0",
                    success_url: `${process.env.FRONTEND_URL}/checkout/success`,
                    failure_url: `${process.env.FRONTEND_URL}/checkout/failure`,
                    signed_field_names: "total_amount,transaction_uuid,product_code",
                    signature: hash
                }
            })
        }

        // 4. Emit Socket Event for Real-time Admin Notification
        const io = req.app.get('io')
        if (io) {
            io.emit('new_order', { orderId, customer_name, total })
        }

        // 6. Send Order Confirmation Email
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
        const { status } = req.body

        let query = `UPDATE orders SET status=$1 WHERE id=$2`
        let params = [status, id]

        // Custom business logic: Delivery implies payment completion for most models
        if (status === 'Delivered') {
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