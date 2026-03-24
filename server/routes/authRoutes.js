const express = require("express")
const router = express.Router()
const { register, login, getUser, sendRegisterOtp, forgotPassword, resetPassword } = require("../controllers/authController")

router.post("/send-register-otp", sendRegisterOtp)
router.post("/register",register)
router.post("/login",login)
router.post("/forgot-password", forgotPassword)
router.post("/reset-password", resetPassword)
router.get("/me",getUser)

module.exports = router