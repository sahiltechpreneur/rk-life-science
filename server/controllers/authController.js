const pool = require("../config/db")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const { sendEmail } = require("../utils/mailer")
const { getEmailTemplate } = require("../utils/emailTemplates")

const JWT_SECRET = process.env.JWT_SECRET || "your_secret_key"

const generateOtp = () => Math.floor(100000 + Math.random() * 900000).toString()


// Send Registration OTP
exports.sendRegisterOtp = async (req, res) => {
  try {
    const { email: rawEmail, fname } = req.body;
    const email = rawEmail?.toLowerCase().trim();

    if (!email) return res.status(400).json({ error: "Email is required" });

    const existing = await pool.query("SELECT * FROM users WHERE LOWER(email)=$1", [email]);
    if (existing.rows.length > 0) return res.status(400).json({error: "Email already in use"});

    const otp = generateOtp();
    const expiresAt = new Date(Date.now() + 10 * 60000); // 10 mins

    await pool.query(
      "INSERT INTO otps (email, otp, type, expires_at) VALUES ($1, $2, 'register', $3)",
      [email, otp, expiresAt]
    );

    const emailContent = getEmailTemplate(
      "Welcome to R. K. Life Science",
      `<p>Hi ${fname},</p>
       <p>Thank you for choosing R. K. Life Science! To complete your registration and secure your account, please use the following One-Time Password (OTP):</p>
       <div class="otp">${otp}</div>
       <p>This code is valid for 10 minutes. If you did not request this code, please ignore this email.</p>`
    );

    const emailSent = await sendEmail(email, "Your Registration OTP", emailContent);
    if (!emailSent) {
      return res.status(500).json({ error: "Failed to send verification email. Please check your email configuration." });
    }

    res.json({ success: true, message: "OTP sent" });
  } catch (err) {
    console.error("Register OTP Flow Error:", err);
    res.status(500).json({ error: `Server error: ${err.message}` });
  }
}

// Register
exports.register = async (req,res)=>{
 try{
  const {fname,lname,email: rawEmail,phone,password,otp} = req.body
  const email = rawEmail?.toLowerCase().trim();

  // Verify OTP
  if (!otp) return res.status(400).json({error: "OTP is required"});
  
  const otpRes = await pool.query(
    "SELECT * FROM otps WHERE LOWER(email)=$1 AND otp=$2 AND type='register' AND expires_at > NOW()", 
    [email, otp]
  );
  if (otpRes.rows.length === 0) return res.status(400).json({error: "Invalid or expired OTP"});

  const hashedPassword = await bcrypt.hash(password,10)

  const user = await pool.query(
   `INSERT INTO users (fname,lname,email,phone,password)
    VALUES($1,$2,$3,$4,$5)
    RETURNING id,fname,lname,email,role`,
   [fname,lname,email,phone,hashedPassword]
  )

  // Clean up used OTPs
  await pool.query("DELETE FROM otps WHERE email=$1 AND type='register'", [email]);

  res.json({
   success:true,
   user:user.rows[0]
  })

 }catch(err){
  res.status(500).json({error:err.message})
 }
}

// Login
exports.login = async (req,res)=>{
 try{
  const {email,password} = req.body

  const userResult = await pool.query(
   "SELECT * FROM users WHERE email=$1",
   [email]
  )

  if(userResult.rows.length===0){
   return res.status(400).json({error:"User not found"})
  }

  const user = userResult.rows[0]

  if (user.is_blocked) {
    return res.status(403).json({ error: "Your account has been blocked. Please contact support." })
  }

  const valid = await bcrypt.compare(password,user.password)

  if(!valid) return res.status(400).json({error:"Invalid credentials"})

  const token = jwt.sign(
   {id:user.id,role:user.role},
   JWT_SECRET,
   {expiresIn:"7d"}
  )

  res.json({success:true,token,user:{id:user.id,fname:user.fname,lname:user.lname,email:user.email,role:user.role}})

 }catch(err){
  res.status(500).json({error:err.message})
 }
}

// Get user info
exports.getUser = async (req,res)=>{
 try{
  const userResult = await pool.query(
   "SELECT id,fname,lname,email,phone,role FROM users WHERE id=$1",
   [req.user.id]
  )

  if (userResult.rows.length === 0) {
    return res.status(404).json({ error: "User not found" });
  }

  res.json({user:userResult.rows[0]})

 }catch(err){
  res.status(500).json({error:err.message})
 }
}

// Forgot Password
exports.forgotPassword = async (req, res) => {
  try {
    const { email: rawEmail } = req.body;
    const email = rawEmail?.toLowerCase().trim();

    if (!email) return res.status(400).json({ error: "Email is required" });

    const userRes = await pool.query("SELECT * FROM users WHERE LOWER(email)=$1", [email]);
    if(userRes.rows.length === 0) return res.status(400).json({error: "User not found"});

    // Clean up any existing reset OTPs for this email before creating a new one
    await pool.query("DELETE FROM otps WHERE LOWER(email)=$1 AND type='reset'", [email]);

    const otp = generateOtp();
    const expiresAt = new Date(Date.now() + 10 * 60000);

    await pool.query(
      "INSERT INTO otps (email, otp, type, expires_at) VALUES ($1, $2, 'reset', $3)",
      [email, otp, expiresAt]
    );

    const emailContent = getEmailTemplate(
      "Password Reset Request",
      `<p>Hello,</p>
       <p>We received a request to reset your password for your R. K. Life Science account. Please use the following One-Time Password (OTP) to proceed:</p>
       <div class="otp">${otp}</div>
       <p>This code is valid for 10 minutes. For security reasons, do not share this code with anyone.</p>`
    );

    const emailSent = await sendEmail(email, "Password Reset OTP", emailContent);
    if (!emailSent) {
      return res.status(500).json({ error: "Failed to send password reset email. Please check your email configuration." });
    }

    res.json({ success: true, message: "OTP sent" });
  } catch (err) {
    console.error("Forgot Password Error:", err);
    res.status(500).json({ error: err.message || "An unexpected error occurred while sending reset OTP." });
  }
}

// Reset Password
exports.resetPassword = async (req, res) => {
  try {
    const { email: rawEmail, otp, newPassword } = req.body;
    const email = rawEmail?.toLowerCase().trim();

    if (!email || !otp || !newPassword) {
      return res.status(400).json({ error: "Email, OTP, and new password are required" });
    }

    const otpRes = await pool.query(
      "SELECT * FROM otps WHERE LOWER(email)=$1 AND otp=$2 AND type='reset' AND expires_at > NOW()", 
      [email, otp]
    );
    if (otpRes.rows.length === 0) return res.status(400).json({error: "Invalid or expired OTP"});

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    const updateRes = await pool.query("UPDATE users SET password=$1 WHERE LOWER(email)=$2", [hashedPassword, email]);

    if (updateRes.rowCount === 0) {
      return res.status(404).json({ error: "Failed to update password. User may no longer exist." });
    }

    await pool.query("DELETE FROM otps WHERE email=$1 AND type='reset'", [email]);

    res.json({ success: true, message: "Password updated successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// Admin: Get all users
exports.getUsers = async (req, res) => {
  try {
    const result = await pool.query("SELECT id, fname, lname, email, phone, role, is_blocked FROM users ORDER BY id DESC");
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// Admin: Block/Unblock user
exports.blockUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { is_blocked } = req.body;
    await pool.query("UPDATE users SET is_blocked=$1 WHERE id=$2", [is_blocked, id]);
    res.json({ success: true, message: is_blocked ? "User blocked" : "User unblocked" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// Admin: Delete user
exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    await pool.query("DELETE FROM users WHERE id=$1", [id]);
    res.json({ success: true, message: "User deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}