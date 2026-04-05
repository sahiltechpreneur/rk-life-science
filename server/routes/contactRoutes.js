const express = require("express");
const router = express.Router();
const contactController = require("../controllers/contactController");

const auth = require("../middleware/authMiddleware");
const admin = require("../middleware/adminMiddleware");

router.post("/", contactController.submitContact);
router.get("/all", [auth, admin], contactController.getContacts);
router.put("/:id/status", [auth, admin], contactController.updateContactStatus);

module.exports = router;
