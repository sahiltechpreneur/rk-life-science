const express = require("express")
const router = express.Router()

const {
 getUserProfile,
 updateUserProfile,
 deleteUser,
 uploadProfileImage,
 getAllUsers
} = require("../controllers/userController")

const authMiddleware = require("../middleware/authMiddleware")
const upload = require("../middleware/upload")

router.get("/profile", authMiddleware, getUserProfile)
router.get("/all", getAllUsers)
router.put("/profile", authMiddleware, updateUserProfile)
router.put("/profile-image", authMiddleware, upload.single("image"), uploadProfileImage)
router.delete("/delete", authMiddleware, deleteUser)

module.exports = router