const express = require("express")
const router = express.Router()
const { register, login, getUser, sendRegisterOtp, forgotPassword, resetPassword, getUsers, blockUser, deleteUser } = require("../controllers/authController")

const auth = require("../middleware/authMiddleware")
const admin = require("../middleware/adminMiddleware")

router.post("/send-register-otp", sendRegisterOtp)
router.post("/register",register)
router.post("/login",login)
router.post("/forgot-password", forgotPassword)
router.post("/reset-password", resetPassword)
router.get("/me", auth, getUser)
router.get("/users", [auth, admin], getUsers)
router.put("/users/:id/block", [auth, admin], blockUser)
router.delete("/users/:id", [auth, admin], deleteUser)

module.exports = router