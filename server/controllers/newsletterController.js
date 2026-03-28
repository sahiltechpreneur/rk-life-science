const pool = require("../config/db");

exports.subscribe = async (req, res) => {
    try {
        const { email } = req.body;
        
        if (!email) {
            return res.status(400).json({ error: "Email is required" });
        }

        // Check if already subscribed
        const existing = await pool.query("SELECT id FROM newsletters WHERE email=$1", [email]);
        if (existing.rows.length > 0) {
            return res.status(200).json({ success: true, message: "Already subscribed" });
        }

        await pool.query(
            "INSERT INTO newsletters (email) VALUES ($1)",
            [email]
        );

        res.json({ success: true, message: "Subscribed successfully" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getSubscribers = async (req, res) => {
    try {
        const result = await pool.query("SELECT * FROM newsletters ORDER BY created_at DESC");
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
