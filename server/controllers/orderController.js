const pool = require("../config/db")

exports.createOrder = async (req, res) => {

    try {

        const {
            customer_name,
            email,
            phone,
            address,
            city,
            total,
            items
        } = req.body

        // create order
        const orderResult = await pool.query(
            `INSERT INTO orders
   (customer_name,email,phone,address,city,total)
   VALUES($1,$2,$3,$4,$5,$6)
   RETURNING id`,
            [customer_name, email, phone, address, city, total]
        )

        const orderId = orderResult.rows[0].id

        // insert order items
        for (const item of items) {

            await pool.query(
                `INSERT INTO order_items
    (order_id,product_id,name,price,quantity)
    VALUES($1,$2,$3,$4,$5)`,
                [
                    orderId,
                    item.id,
                    item.name,
                    item.price,
                    item.quantity
                ]
            )

        }

        const io = req.app.get('io')
        if (io) {
            io.emit('new_order', { orderId, customer_name, total })
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