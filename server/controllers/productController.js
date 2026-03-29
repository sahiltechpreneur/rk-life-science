const pool = require("../config/db")

exports.getProducts = async (req, res) => {

    try {

        const page = req.query.page || 1
        const limit = 6
        const offset = (page - 1) * limit

        const search = req.query.search || ""

        const result = await pool.query(
            `
 SELECT * FROM products
 WHERE name ILIKE $1
 ORDER BY id DESC
 LIMIT $2 OFFSET $3
 `,
            [`%${search}%`, limit, offset]
        )

        res.json(result.rows)

    } catch (err) {

        res.status(500).json({ error: err.message })

    }

}


exports.createProduct = async (req, res) => {
  try {
    const { 
      name, description, price, stock, 
      composition, packing, ingredients, advantages, content 
    } = req.body
    
    // Parse numeric fields safely
    const numericPrice = parseFloat(price) || 0
    const numericStock = parseInt(stock) || 0

    // Handle multiple images from Cloudinary (req.files)
    const images = req.files ? req.files.map(file => file.path) : []
    const mainImage = images.length > 0 ? images[0] : null

    const result = await pool.query(
      `INSERT INTO products 
      (name, description, price, stock, images, image, composition, packing, ingredients, advantages, content) 
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) 
      RETURNING *`,
      [
        name, description, numericPrice, numericStock, 
        images, mainImage, 
        composition || null, packing || null, 
        ingredients || null, advantages || null, content || null
      ]
    )

    res.json(result.rows[0])
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: err.message })
  }
}


exports.updateProduct = async (req, res) => {
  const { id } = req.params
  const { 
    name, description, price, stock, 
    composition, packing, ingredients, advantages, content 
  } = req.body

  const numericPrice = parseFloat(price) || 0
  const numericStock = parseInt(stock) || 0

  try {
    // Build values array
    let values = [
      name, description, numericPrice, numericStock, 
      composition || null, packing || null, 
      ingredients || null, advantages || null, content || null
    ]
    let argCount = values.length // 9

    let updateQuery = `
      UPDATE products 
      SET name=$1, description=$2, price=$3, stock=$4, 
          composition=$5, packing=$6, ingredients=$7, advantages=$8, content=$9
    `

    if (req.files && req.files.length > 0) {
      const images = req.files.map(file => file.path)
      const mainImage = images[0]
      updateQuery += `, images=$${argCount + 1}, image=$${argCount + 2}`
      values.push(images, mainImage)
      argCount += 2
    }

    updateQuery += ` WHERE id=$${argCount + 1}`
    values.push(id)

    await pool.query(updateQuery, values)
    res.json({ message: "Product updated" })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: err.message })
  }
}



exports.deleteProduct = async (req, res) => {

    const { id } = req.params

    try {

        await pool.query(
            "DELETE FROM products WHERE id=$1",
            [id]
        )

        res.json({ message: "Product deleted" })

    } catch (err) {
        res.status(500).json({ error: err.message })
    }

}

exports.getProductById = async (req,res)=>{

 try{

  const {id} = req.params

  const result = await pool.query(
   "SELECT * FROM products WHERE id=$1",
   [id]
  )

  res.json(result.rows[0])

 }catch(err){

  res.status(500).json({error:err.message})

 }

}