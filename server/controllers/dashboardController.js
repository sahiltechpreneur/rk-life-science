const pool = require("../config/db")

exports.getDashboardStats = async (req, res) => {
    try {
        // total orders
        const orders = await pool.query(
            "SELECT COUNT(*) FROM orders"
        )

        // total revenue (excluding cancelled)
        const revenue = await pool.query(
            "SELECT SUM(total) FROM orders WHERE status != 'Cancelled'"
        )

        // total products
        const products = await pool.query(
            "SELECT COUNT(*) FROM products"
        )

        // recent orders
        const recentOrders = await pool.query(
            `SELECT id, customer_name, total, status, TO_CHAR(created_at, 'Mon DD, YYYY') as created_at
             FROM orders
             ORDER BY created_at DESC
             LIMIT 5`
        )

        // weekly revenue aggregation
        const weeklyRevenue = await pool.query(
            `SELECT 
                TO_CHAR(DATE_TRUNC('week', created_at), 'Mon DD') as week,
                SUM(total) as revenue,
                MIN(DATE_TRUNC('week', created_at)) as week_start
             FROM orders
             WHERE created_at >= NOW() - INTERVAL '6 weeks'
             AND status != 'Cancelled'
             GROUP BY DATE_TRUNC('week', created_at)
             ORDER BY week_start`
        )

        // daily revenue aggregation
        const dailyRevenue = await pool.query(
            `SELECT 
                TO_CHAR(DATE_TRUNC('day', created_at), 'Mon DD') as day,
                SUM(total) as revenue,
                DATE_TRUNC('day', created_at) as day_start
             FROM orders
             WHERE created_at >= NOW() - INTERVAL '30 days'
             AND status != 'Cancelled'
             GROUP BY DATE_TRUNC('day', created_at)
             ORDER BY day_start`
        )

        res.json({
            totalOrders: parseInt(orders.rows[0].count),
            totalRevenue: parseInt(revenue.rows[0].sum || 0),
            totalProducts: parseInt(products.rows[0].count),
            recentOrders: recentOrders.rows,
            weeklyRevenue: weeklyRevenue.rows,
            dailyRevenue: dailyRevenue.rows
        })

    } catch (err) {
        res.status(500).json({
            error: err.message
        })
    }
}