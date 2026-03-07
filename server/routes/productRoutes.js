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

router.get("/", getProducts)
router.post("/", upload.single("image"), createProduct)
router.put("/:id", upload.single("image"), updateProduct)
router.delete("/:id", deleteProduct)
router.get("/:id", getProductById)

module.exports = router