const pool = require("./server/config/db");

async function migrate() {
    try {
        await pool.query(`ALTER TABLE orders ADD COLUMN IF NOT EXISTS payment_method VARCHAR(50) DEFAULT 'COD'`);
        await pool.query(`ALTER TABLE orders ADD COLUMN IF NOT EXISTS payment_status VARCHAR(50) DEFAULT 'Pending'`);
        console.log("Migration successful");
    } catch(e) {
        console.error("Migration failed:", e);
    } finally {
        process.exit();
    }
}
migrate();
