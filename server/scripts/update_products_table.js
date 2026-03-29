require("dotenv").config();
const pool = require("../config/db");

async function updateTable() {
    try {
        console.log("Updating products table...");
        
        await pool.query(`
            ALTER TABLE products 
            ADD COLUMN IF NOT EXISTS images TEXT[] DEFAULT '{}',
            ADD COLUMN IF NOT EXISTS composition TEXT,
            ADD COLUMN IF NOT EXISTS packing TEXT,
            ADD COLUMN IF NOT EXISTS ingredients TEXT,
            ADD COLUMN IF NOT EXISTS advantages TEXT,
            ADD COLUMN IF NOT EXISTS content TEXT;
        `);
        
        console.log("✓ Products table updated successfully");
        process.exit(0);
    } catch (err) {
        console.error("Error updating table:", err);
        process.exit(1);
    }
}

updateTable();
