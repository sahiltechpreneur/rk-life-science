const express = require("express")
const cors = require("cors")
require("dotenv").config()

const authRoutes = require("./routes/authRoutes")
const userRoutes = require("./routes/userRoutes")
const productRoutes = require("./routes/productRoutes")

const app = express()

app.use(cors())
app.use(express.json())
app.use("/uploads",express.static("uploads"))

app.use("/api/auth", authRoutes)
app.use("/api/user",userRoutes)
app.use("/api/products",productRoutes)

app.get("/", (req,res)=>{
  res.send("RK Life Science API running")
})

const PORT = 5000

app.listen(PORT,()=>{
  console.log(`Server running on port ${PORT}`)
})