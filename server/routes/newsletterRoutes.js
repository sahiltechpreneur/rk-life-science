const express = require("express");
const router = express.Router();
const newsletterController = require("../controllers/newsletterController");

const auth = require("../middleware/authMiddleware");
const admin = require("../middleware/adminMiddleware");

router.post("/subscribe", newsletterController.subscribe);
router.get("/subscribers", [auth, admin], newsletterController.getSubscribers);

module.exports = router;
