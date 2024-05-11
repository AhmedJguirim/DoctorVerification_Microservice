const express = require("express");
const router = express.Router();
const verificationsController = require("../controllers/Verifications.controller");

const multer = require("multer");

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.post("/", upload.single("file"), documentController.createDocument);

module.exports = router;
