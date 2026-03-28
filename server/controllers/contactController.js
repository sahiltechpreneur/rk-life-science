const pool = require("../config/db");

exports.submitContact = async (req, res) => {
    try {
        const { name, email, feedback } = req.body;
        
        if (!name || !email || !feedback) {
            return res.status(400).json({ error: "All fields are required" });
        }

        await pool.query(
            "INSERT INTO contacts (name, email, feedback) VALUES ($1, $2, $3)",
            [name, email, feedback]
        );

        res.json({ success: true, message: "Message sent successfully" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getContacts = async (req, res) => {
    try {
        const result = await pool.query("SELECT * FROM contacts ORDER BY created_at DESC");
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.updateContactStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body; // 'seen' or 'unseen'
        
        await pool.query("UPDATE contacts SET status=$1 WHERE id=$2", [status, id]);
        res.json({ success: true });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
