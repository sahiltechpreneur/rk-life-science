const pool = require("./config/db")

async function migrate() {
  try {
    await pool.query("ALTER TABLE orders ADD COLUMN IF NOT EXISTS shipping_charge NUMERIC DEFAULT 0")
    console.log("Migration successful: Added shipping_charge to orders")
    process.exit(0)
  } catch (err) {
    console.error("Migration failed:", err)
    process.exit(1)
  }
}

migrate()
