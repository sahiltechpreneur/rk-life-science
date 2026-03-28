const express = require("express");
const router = express.Router();
const contactController = require("../controllers/contactController");

router.post("/", contactController.submitContact);
router.get("/all", contactController.getContacts);
router.put("/:id/status", contactController.updateContactStatus);

module.exports = router;
