/**
 * @swagger
 * /api/analytics/revenue:
 *   get:
 *     summary: Get revenue calculations based on type
 *     tags: [Analytics]
 *     parameters:
 *       - in: query
 *         name: type
 *         schema:
 *           type: string
 *           enum: [total, product, category, region, trend]
 *         required: true
 *         description: Type of revenue calculation
 *       - in: query
 *         name: startDate
 *         schema:
 *           type: string
 *           format: date
 *         required: true
 *         description: Start date (YYYY-MM-DD)
 *       - in: query
 *         name: endDate
 *         schema:
 *           type: string
 *           format: date
 *         required: true
 *         description: End date (YYYY-MM-DD)
 *     responses:
 *       200:
 *         description: Revenue data based on type
 *         content:
 *           application/json:
 *             schema:
 *               oneOf:
 *                 - type: object
 *                   properties:
 *                     totalRevenue:
 *                       type: number
 *                       example: 12345.67
 *                 - type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                         example: "North America"
 *                       totalRevenue:
 *                         type: number
 *                         example: 15000.50
 *       400:
 *         description: Missing or invalid parameters
 *       500:
 *         description: Server error
 */



// routes/analyticsRoutes.js
const express = require("express");
const { getRevenue } = require("../controllers/analyticsController");
const router = express.Router();

router.get("/revenue", getRevenue);

module.exports = router;
