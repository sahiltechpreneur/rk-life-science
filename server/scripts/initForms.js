require("dotenv").config();
const pool = require("../config/db");

async function initTables() {
    try {
        console.log("Creating tables...");
        
        await pool.query(`
            CREATE TABLE IF NOT EXISTS contacts (
                id SERIAL PRIMARY KEY,
                name VARCHAR(255) NOT NULL,
                email VARCHAR(255) NOT NULL,
                feedback TEXT NOT NULL,
                status VARCHAR(20) DEFAULT 'unseen',
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );
        `);
        console.log("✓ Contacts table ready");

        await pool.query(`
            CREATE TABLE IF NOT EXISTS newsletters (
                id SERIAL PRIMARY KEY,
                email VARCHAR(255) UNIQUE NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );
        `);
        console.log("✓ Newsletters table ready");

        process.exit(0);
    } catch (err) {
        console.error("Error creating tables:", err);
        process.exit(1);
    }
}

initTables();
