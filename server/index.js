const express = require("express")
const cors = require("cors")
const http = require("http")
const { Server } = require("socket.io")
require("dotenv").config()

const authRoutes = require("./routes/authRoutes")
const userRoutes = require("./routes/userRoutes")
const productRoutes = require("./routes/productRoutes")
const orderRoutes = require("./routes/orderRoutes")
const dashboardRoutes = require("./routes/dashboardRoutes")

const app = express()
const server = http.createServer(app)
const io = new Server(server, { cors: { origin: "*" } })

app.set('io', io)

app.use(cors())
app.use(express.json())
app.use("/uploads",express.static("uploads"))

app.use("/api/auth",require("./routes/authRoutes"))
app.use("/api/user",userRoutes)
app.use("/api/products",productRoutes)
app.use("/api/orders", orderRoutes)
app.use("/api/dashboard", dashboardRoutes)
app.use("/api/contact", require("./routes/contactRoutes"))
app.use("/api/newsletter", require("./routes/newsletterRoutes"))

app.get("/", (req,res)=>{
  res.send("RK Life Science API running")
})

const PORT = process.env.PORT || 5000

server.listen(PORT,()=>{
  console.log(`Server running on port ${PORT}`)
})