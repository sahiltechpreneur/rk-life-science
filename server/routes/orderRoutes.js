const express = require("express")
const router = express.Router()

const {
 createOrder,
 getOrders,
 getOrderDetails,
 updateOrderStatus
} = require("../controllers/orderController")

router.post("/",createOrder)
router.get("/",getOrders)
router.get("/:id",getOrderDetails)
router.put("/:id/status",updateOrderStatus)

module.exports = router