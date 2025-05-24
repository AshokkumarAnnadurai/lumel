/**
 * @swagger
 * /health:
 *   get:
 *     summary: Get server health status and database connection info
 *     tags: [Health]
 *     responses:
 *       200:
 *         description: Returns server and DB connection status
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: OK
 *                 uptime:
 *                   type: number
 *                   example: 12345.67
 *                 db:
 *                   type: object
 *                   properties:
 *                     status:
 *                       type: string
 *                       example: Connected
 *                     stateCode:
 *                       type: integer
 *                       example: 1
 *                 timestamp:
 *                   type: string
 *                   example: 2025-05-24T12:00:00Z
 */


const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

router.get('/', (req, res) => {
  const mongoState = mongoose.connection.readyState;
  let dbStatus = "Unknown";

  switch (mongoState) {
    case 0:
      dbStatus = "Disconnected";
      break;
    case 1:
      dbStatus = "Connected";
      break;
    case 2:
      dbStatus = "Connecting";
      break;
    case 3:
      dbStatus = "Disconnecting";
      break;
  }

  res.status(200).json({
    status: "OK",
    uptime: process.uptime(),
    db: {
      status: dbStatus,
      stateCode: mongoState
    },
    timestamp: new Date().toISOString()
  });
});

module.exports = router;
