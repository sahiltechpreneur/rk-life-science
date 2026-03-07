const pool = require("../config/db")

exports.getUserProfile = async(req,res)=>{

 try{

  const result = await pool.query(
   "SELECT id,fname,lname,email,phone,image FROM users WHERE id=$1",
   [req.user.id]
  )
  const user = result.rows[0]
  
  const ordersResult = await pool.query(
   "SELECT * FROM orders WHERE email=$1 ORDER BY created_at DESC",
   [user.email]
  )

  user.orders = ordersResult.rows

  res.json(user)

 }catch(err){
  res.status(500).json({error:err.message})
 }

}


exports.updateUserProfile = async(req,res)=>{

 const {fname,lname,email,phone} = req.body

 try{

  const result = await pool.query(
   "UPDATE users SET fname=$1,lname=$2,email=$3,phone=$4 WHERE id=$5 RETURNING id,fname,lname,email,phone,image",
   [fname,lname,email,phone,req.user.id]
  )

  res.json(result.rows[0])

 }catch(err){
  res.status(500).json({error:err.message})
 }

}


exports.deleteUser = async(req,res)=>{

 try{

  await pool.query(
   "DELETE FROM users WHERE id=$1",
   [req.user.id]
  )

  res.json({message:"Account deleted"})

 }catch(err){
  res.status(500).json({error:err.message})
 }

}

exports.uploadProfileImage = async(req,res)=>{

  try{
    if(!req.file){
      return res.status(400).json({error:"No image provided"})
    }

    const imageUrl = req.file.path // Cloudinary URL

    const result = await pool.query(
      "UPDATE users SET image=$1 WHERE id=$2 RETURNING image",
      [imageUrl, req.user.id]
    )

    res.json({ imageUrl: result.rows[0].image })

  }catch(err){
    res.status(500).json({error:err.message})
  }

}