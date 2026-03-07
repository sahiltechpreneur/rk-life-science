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

  const { name, description, price, stock, category_id } = req.body

  const image = req.file ? req.file.filename : null

  const result = await pool.query(
   `INSERT INTO products
   (name, description, price, stock, image, category_id)
   VALUES ($1,$2,$3,$4,$5,$6)
   RETURNING *`,
   [name, description, price, stock, image, category_id || null]
  )

  res.json(result.rows[0])

 } catch (err) {

  console.error(err)

  res.status(500).json({ error: err.message })

 }

}

exports.updateProduct = async (req, res) => {

    const { id } = req.params

    const { name, description, price, stock, category_id } = req.body

    const image = req.file ? req.file.filename : null

    try {

        await pool.query(

            `
 UPDATE products
 SET
 name=$1,
 description=$2,
 price=$3,
 stock=$4,
 category_id=$5,
 image=COALESCE($6,image)
 WHERE id=$7
 `,

            [name, description, price, stock, category_id, image, id]

        )

        res.json({ message: "Product updated" })

    } catch (err) {

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