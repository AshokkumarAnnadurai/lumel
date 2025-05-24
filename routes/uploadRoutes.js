/**
 * @swagger
 * /api/upload/upload:
 *   post:
 *     summary: Upload a CSV file
 *     tags: [Upload]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               file:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Upload successful
 */


// routes/uploadRoutes.js
const express = require("express");
const multer = require("multer");
const { uploadCSV } = require("../controllers/uploadController");

const upload = multer({ dest: "uploads/" });
const router = express.Router();

router.post("/upload", upload.single("file"), uploadCSV);

module.exports = router;
