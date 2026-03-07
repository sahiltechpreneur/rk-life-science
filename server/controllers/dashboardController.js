const pool = require("../config/db")

exports.getDashboardStats = async (req, res) => {

    try {

        // total orders
        const orders = await pool.query(
            "SELECT COUNT(*) FROM orders"
        )

        // total revenue
        const revenue = await pool.query(
            "SELECT SUM(total) FROM orders"
        )

        // total products
        const products = await pool.query(
            "SELECT COUNT(*) FROM products"
        )

        // recent orders
        const recentOrders = await pool.query(
            `SELECT id,customer_name,total,status
     FROM orders
     ORDER BY created_at DESC
     LIMIT 5`
        )

        res.json({
            totalOrders: orders.rows[0].count,
            totalRevenue: revenue.rows[0].sum || 0,
            totalProducts: products.rows[0].count,
            recentOrders: recentOrders.rows
        })

    } catch (err) {

        res.status(500).json({
            error: err.message
        })

    }

}