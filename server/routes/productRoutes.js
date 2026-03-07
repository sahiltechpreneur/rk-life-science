const express = require("express")
const router = express.Router()

const upload = require("../middleware/upload")

const {
 getProducts,
 createProduct,
 updateProduct,
 deleteProduct
} = require("../controllers/productController")

router.get("/", getProducts)
router.post("/", upload.single("image"), createProduct)
router.put("/:id", upload.single("image"), updateProduct)
router.delete("/:id", deleteProduct)

module.exports = router