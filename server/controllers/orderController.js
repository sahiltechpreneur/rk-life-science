const pool = require("../config/db")
const crypto = require("crypto")
const { sendEmail } = require("../utils/mailer")
const { getEmailTemplate } = require("../utils/emailTemplates")

exports.createOrder = async (req, res) => {

    try {

        const {
            customer_name,
            email,
            phone,
            address,
            city,
            total,
            items,
            payment_method = 'COD'
        } = req.body

        const payment_status = (payment_method === 'eSewa' || payment_method === 'Khalti') ? 'Pending' : 'Unpaid';

        // create order
        const orderResult = await pool.query(
            `INSERT INTO orders
   (customer_name,email,phone,address,city,total,payment_method,payment_status)
   VALUES($1,$2,$3,$4,$5,$6,$7,$8)
   RETURNING id`,
            [customer_name, email, phone, address, city, total, payment_method, payment_status]
        )

        const orderId = orderResult.rows[0].id

        // insert order items
        for (const item of items) {
            await pool.query(
                `INSERT INTO order_items
                (order_id,product_id,name,price,quantity,image_url)
                VALUES($1,$2,$3,$4,$5,$6)`,
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

        if (payment_method === 'eSewa') {
            const transaction_uuid = `${orderId}-${Date.now()}`;
            const signatureString = `total_amount=${total},transaction_uuid=${transaction_uuid},product_code=EPAYTEST`;
            const secretKey = "8gBm/:&EnhH.1/q";
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
                    success_url: "http://localhost:3000/checkout/success",
                    failure_url: "http://localhost:3000/checkout/failure",
                    signed_field_names: "total_amount,transaction_uuid,product_code",
                    signature: hash
                }
            })
        }

        if (payment_method === 'Khalti') {
            const purchase_order_id = String(orderId);
            const purchase_order_name = `Order #${orderId}`;
            const amountInPaisa = Math.round(Number(total) * 100); 

            try {
                const payload = {
                    return_url: "http://localhost:3000/checkout/khalti",
                    website_url: "http://localhost:3000",
                    amount: amountInPaisa,
                    purchase_order_id: purchase_order_id,
                    purchase_order_name: purchase_order_name,
                    customer_info: {
                        name: String(customer_name),
                        email: String(email),
                        phone: String(phone)
                    }
                };

                console.log("Initiating Khalti with payload:", payload);

                // Khalti Sandbox Endpoint
                const khaltiResponse = await fetch("https://dev.khalti.com/api/v2/epayment/initiate/", {
                    method: 'POST',
                    headers: {
                        'Authorization': `Key ${process.env.KHALTI_SECRET_KEY || '1145ea0490eb414eb02cc724cb116035'}`, 
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(payload)
                });

                const khaltiData = await khaltiResponse.json();
                console.log("Khalti Response:", khaltiData);

                if (khaltiResponse.ok && khaltiData.payment_url) {
                    return res.json({
                        success: true,
                        orderId,
                        payment_method: 'Khalti',
                        payment_url: khaltiData.payment_url // Frontend redirects here
                    });
                } else {
                    console.error("Khalti Error Response:", khaltiData);
                    return res.status(400).json({ 
                        success: false, 
                        error: "Khalti Setup Failed", 
                        message: khaltiData.message || "Failed to initiate Khalti payment",
                        details: khaltiData 
                    });
                }

            } catch (error) {
                console.error("Khalti Fetch Exception:", error);
                return res.status(500).json({ error: "Khalti request failed", message: error.message });
            }
        }

        const io = req.app.get('io')
        if (io) {
            io.emit('new_order', { orderId, customer_name, total })
        }

        // Send Order Confirmation Email
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

exports.getOrders = async (req, res) => {

    try {

        const result = await pool.query(
            `SELECT * FROM orders
    ORDER BY created_at DESC`
        )

        res.json(result.rows)

    } catch (err) {

        res.status(500).json({ error: err.message })

    }

}

exports.getOrderDetails = async (req, res) => {

    try {

        const { id } = req.params

        const order = await pool.query(
            `SELECT * FROM orders WHERE id=$1`,
            [id]
        )

        const items = await pool.query(
            `SELECT * FROM order_items WHERE order_id=$1`,
            [id]
        )

        res.json({
            order: order.rows[0],
            items: items.rows
        })

    } catch (err) {

        res.status(500).json({ error: err.message })

    }

}

exports.updateOrderStatus = async (req, res) => {

    try {

        const { id } = req.params
        const { status } = req.body

        await pool.query(
            `UPDATE orders
    SET status=$1
    WHERE id=$2`,
            [status, id]
        )

        const io = req.app.get('io')
        if (io) {
            io.emit('order_status_updated', { orderId: id, status })
        }

        res.json({
            success: true,
            message: "Order status updated"
        })

    } catch (err) {

        res.status(500).json({ error: err.message })

    }

}

exports.cancelOrder = async (req, res) => {
    try {
        const { id } = req.params;
        
        // check if order exists and is pending
        const orderResult = await pool.query("SELECT * FROM orders WHERE id=$1", [id]);
        if (orderResult.rows.length === 0) return res.status(404).json({ error: "Order not found" });

        const order = orderResult.rows[0];
        if (order.status !== 'Pending') return res.status(400).json({ error: "Only pending orders can be cancelled" });

        // Update status
        await pool.query("UPDATE orders SET status='Cancelled' WHERE id=$1", [id]);

        const io = req.app.get('io')
        if (io) {
            io.emit('order_status_updated', { orderId: id, status: 'Cancelled' })
        }

        res.json({ success: true, message: "Order cancelled successfully" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}