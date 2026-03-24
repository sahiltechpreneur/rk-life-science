const express = require("express")
const router = express.Router()
const { register, login, getUser, sendRegisterOtp, forgotPassword, resetPassword, getUsers, blockUser, deleteUser } = require("../controllers/authController")

router.post("/send-register-otp", sendRegisterOtp)
router.post("/register",register)
router.post("/login",login)
router.post("/forgot-password", forgotPassword)
router.post("/reset-password", resetPassword)
router.get("/me",getUser)
router.get("/users", getUsers)
router.put("/users/:id/block", blockUser)
router.delete("/users/:id", deleteUser)

module.exports = router