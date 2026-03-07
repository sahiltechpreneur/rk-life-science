const pool = require("../config/db")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

const JWT_SECRET = process.env.JWT_SECRET || "your_secret_key"

// Register
exports.register = async (req,res)=>{
 try{
  const {fname,lname,email,phone,password} = req.body

  const hashedPassword = await bcrypt.hash(password,10)

  const user = await pool.query(
   `INSERT INTO users (fname,lname,email,phone,password)
    VALUES($1,$2,$3,$4,$5)
    RETURNING id,fname,lname,email,role`,
   [fname,lname,email,phone,hashedPassword]
  )

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