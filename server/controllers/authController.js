const pool = require("../config/db")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const { sendEmail } = require("../utils/mailer")

const JWT_SECRET = process.env.JWT_SECRET || "your_secret_key"

const generateOtp = () => Math.floor(100000 + Math.random() * 900000).toString()


// Send Registration OTP
exports.sendRegisterOtp = async (req, res) => {
  try {
    const { email, fname } = req.body;
    const existing = await pool.query("SELECT * FROM users WHERE email=$1", [email]);
    if (existing.rows.length > 0) return res.status(400).json({error: "Email already in use"});

    const otp = generateOtp();
    const expiresAt = new Date(Date.now() + 10 * 60000); // 10 mins

    await pool.query(
      "INSERT INTO otps (email, otp, type, expires_at) VALUES ($1, $2, 'register', $3)",
      [email, otp, expiresAt]
    );

    await sendEmail(email, "Your Registration OTP", `<p>Hi ${fname},</p><p>Your OTP for registration is <b>${otp}</b>. It expires in 10 minutes.</p>`);

    res.json({ success: true, message: "OTP sent" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// Register
exports.register = async (req,res)=>{
 try{
  const {fname,lname,email,phone,password,otp} = req.body

  // Verify OTP
  if (!otp) return res.status(400).json({error: "OTP is required"});
  
  const otpRes = await pool.query(
    "SELECT * FROM otps WHERE email=$1 AND otp=$2 AND type='register' AND expires_at > NOW()", 
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
  const authHeader = req.headers.authorization
  if(!authHeader) return res.status(401).json({error:"Unauthorized"})

  const token = authHeader.split(" ")[1]

  const decoded = jwt.verify(token,JWT_SECRET)

  const userResult = await pool.query(
   "SELECT id,fname,lname,email,phone,role FROM users WHERE id=$1",
   [decoded.id]
  )

  res.json({user:userResult.rows[0]})

 }catch(err){
  res.status(500).json({error:err.message})
 }
}

// Forgot Password
exports.forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const userRes = await pool.query("SELECT * FROM users WHERE email=$1", [email]);
    if(userRes.rows.length === 0) return res.status(400).json({error: "User not found"});

    const otp = generateOtp();
    const expiresAt = new Date(Date.now() + 10 * 60000);

    await pool.query(
      "INSERT INTO otps (email, otp, type, expires_at) VALUES ($1, $2, 'reset', $3)",
      [email, otp, expiresAt]
    );

    await sendEmail(email, "Password Reset OTP", `<p>Your OTP for password reset is <b>${otp}</b>. It expires in 10 minutes.</p>`);

    res.json({ success: true, message: "OTP sent" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// Reset Password
exports.resetPassword = async (req, res) => {
  try {
    const { email, otp, newPassword } = req.body;
    const otpRes = await pool.query(
      "SELECT * FROM otps WHERE email=$1 AND otp=$2 AND type='reset' AND expires_at > NOW()", 
      [email, otp]
    );
    if (otpRes.rows.length === 0) return res.status(400).json({error: "Invalid or expired OTP"});

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await pool.query("UPDATE users SET password=$1 WHERE email=$2", [hashedPassword, email]);

    await pool.query("DELETE FROM otps WHERE email=$1 AND type='reset'", [email]);

    res.json({ success: true, message: "Password updated successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}