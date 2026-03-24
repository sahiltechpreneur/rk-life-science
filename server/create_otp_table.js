const pool = require("./config/db");

const createOtpTable = async () => {
    try {
        await pool.query(`
            CREATE TABLE IF NOT EXISTS otps (
                id SERIAL PRIMARY KEY,
                email VARCHAR(255) NOT NULL,
                otp VARCHAR(6) NOT NULL,
                type VARCHAR(50) NOT NULL,
                expires_at TIMESTAMP NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );
        `);
        console.log("otps table created successfully");
        process.exit(0);
    } catch (err) {
        console.error("Error creating otps table:", err);
        process.exit(1);
    }
};

createOtpTable();
