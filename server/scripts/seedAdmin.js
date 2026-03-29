require("dotenv").config();
const pool = require("../config/db");
const bcrypt = require("bcrypt");

async function seedAdmin() {
  try {
    const email = "admin@rk.com";
    const password = "admin123";
    
    // Check if admin already exists
    const existing = await pool.query("SELECT * FROM users WHERE email=$1", [email]);
    if (existing.rows.length > 0) {
      console.log("Admin user already exists!");
      
      // Update password just in case
      const hashedPassword = await bcrypt.hash(password, 10);
      await pool.query("UPDATE users SET password=$1, role='admin' WHERE email=$2", [hashedPassword, email]);
      console.log("Admin password updated to 'admin123' and role set to 'admin'.");
    } else {
      const hashedPassword = await bcrypt.hash(password, 10);
      await pool.query(
        `INSERT INTO users (fname, lname, email, phone, password, role) 
         VALUES ($1, $2, $3, $4, $5, $6)`,
        ["Super", "Admin", email, "9800000000", hashedPassword, "admin"]
      );
      console.log("Admin user successfully created!");
    }
    
    process.exit(0);
  } catch (error) {
    console.error("Error seeding admin:", error);
    process.exit(1);
  }
}

seedAdmin();
