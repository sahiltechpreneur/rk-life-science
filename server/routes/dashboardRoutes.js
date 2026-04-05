const express = require("express")
const router = express.Router()

const { getDashboardStats } = require("../controllers/dashboardController")

const auth = require("../middleware/authMiddleware")
const admin = require("../middleware/adminMiddleware")

router.get("/", [auth, admin], getDashboardStats)

module.exports = router