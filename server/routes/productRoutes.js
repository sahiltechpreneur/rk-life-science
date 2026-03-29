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
router.post("/", upload.array("images", 6), createProduct)
router.put("/:id", upload.array("images", 6), updateProduct)
router.delete("/:id", deleteProduct)
router.get("/:id", getProductById)

module.exports = router