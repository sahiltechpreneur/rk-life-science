const pool = require("./config/db");

async function addImageColumn() {
  try {
    await pool.query("ALTER TABLE users ADD COLUMN IF NOT EXISTS image VARCHAR(255)");
    console.log("Successfully added 'image' column to 'users' table.");
  } catch (err) {
    console.error("Error adding column:", err.message);
  } finally {
    process.exit();
  }
}

addImageColumn();
