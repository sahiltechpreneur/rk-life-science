const pool = require("../config/db")

exports.getUserProfile = async(req,res)=>{

 try{

  const result = await pool.query(
   "SELECT id,fname,lname,email,phone FROM users WHERE id=$1",
   [req.user.id]
  )

  res.json(result.rows[0])

 }catch(err){
  res.status(500).json({error:err.message})
 }

}


exports.updateUserProfile = async(req,res)=>{

 const {fname,lname,email,phone} = req.body

 try{

  const result = await pool.query(
   "UPDATE users SET fname=$1,lname=$2,email=$3,phone=$4 WHERE id=$5 RETURNING *",
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