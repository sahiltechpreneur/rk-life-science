const express = require("express")
const router = express.Router()

const {
 createOrder,
 getOrders,
 getOrderDetails,
 updateOrderStatus,
 cancelOrder
} = require("../controllers/orderController")

const auth = require("../middleware/authMiddleware")
const admin = require("../middleware/adminMiddleware")

router.post("/", auth, createOrder)
router.get("/", [auth, admin], getOrders)
router.get("/:id", auth, getOrderDetails) // User can see their own orders (check logic in controller later)
router.put("/:id/status", [auth, admin], updateOrderStatus)
router.put("/:id/cancel", auth, cancelOrder)

module.exports = router