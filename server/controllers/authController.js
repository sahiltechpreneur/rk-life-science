const pool = require("../config/db")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

exports.registerUser = async(req,res)=>{

  const {fname,lname,email,phone,password} = req.body

  try{

    const hashedPassword = await bcrypt.hash(password,10)

    const result = await pool.query(
      "INSERT INTO users(fname,lname,email,phone,password) VALUES($1,$2,$3,$4,$5) RETURNING *",
      [fname,lname,email,phone,hashedPassword]
    )

    res.status(201).json(result.rows[0])

  }catch(error){
    res.status(500).json({error:error.message})
  }
}

exports.loginUser = async(req,res)=>{

  const {email,password} = req.body

  try{

    const result = await pool.query(
      "SELECT * FROM users WHERE email=$1",
      [email]
    )

    if(result.rows.length===0){
      return res.status(404).json({message:"User not found"})
    }

    const user = result.rows[0]

    const valid = await bcrypt.compare(password,user.password)

    if(!valid){
      return res.status(401).json({message:"Invalid password"})
    }

    const token = jwt.sign(
      {id:user.id,email:user.email},
      "secretkey",
      {expiresIn:"7d"}
    )

    res.json({token,user})

  }catch(error){
    res.status(500).json({error:error.message})
  }
}