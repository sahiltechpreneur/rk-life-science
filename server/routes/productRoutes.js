const express = require("express")
const router = express.Router()

const upload = require("../middleware/upload")

const {
 getProducts,
 createProduct,
 updateProduct,
 deleteProduct,
getProductById
} = require("../controllers/productController")

const auth = require("../middleware/authMiddleware")
const admin = require("../middleware/adminMiddleware")

router.get("/", getProducts)
router.post("/", [auth, admin], upload.array("images", 6), createProduct)
router.put("/:id", [auth, admin], upload.array("images", 6), updateProduct)
router.delete("/:id", [auth, admin], deleteProduct)
router.get("/:id", getProductById)

module.exports = router