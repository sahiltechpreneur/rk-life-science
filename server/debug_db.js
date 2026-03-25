const pool = require("./config/db");
const fs = require("fs");

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
        fs.writeFileSync("db_status.log", "otps table created successfully\n");
        process.exit(0);
    } catch (err) {
        fs.writeFileSync("db_status.log", `Error creating otps table: ${err.message}\n${err.stack}\n`);
        process.exit(1);
    }
};

createOtpTable();
