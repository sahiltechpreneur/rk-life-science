const pool = require("../config/db")

exports.getProducts = async(req,res)=>{

 try{

  const result = await pool.query(
   "SELECT * FROM products ORDER BY id DESC"
  )

  res.json(result.rows)

 }catch(err){
  res.status(500).json({error:err.message})
 }

}


exports.createProduct = async(req,res)=>{

 const {name,description,price,stock,image} = req.body

 try{

  const result = await pool.query(
   "INSERT INTO products(name,description,price,stock,image) VALUES($1,$2,$3,$4,$5) RETURNING *",
   [name,description,price,stock,image]
  )

  res.json(result.rows[0])

 }catch(err){
  res.status(500).json({error:err.message})
 }

}


exports.deleteProduct = async(req,res)=>{

 const {id} = req.params

 try{

  await pool.query(
   "DELETE FROM products WHERE id=$1",
   [id]
  )

  res.json({message:"Product deleted"})

 }catch(err){
  res.status(500).json({error:err.message})
 }

}