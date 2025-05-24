require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const errorHandler = require("./middlewares/errorHandlers");
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./swagger/swagger');
const healthRoutes = require('./routes/healthRoutes');
const uploadRoutes = require("./routes/uploadRoutes");
const analyticsRoutes = require("./routes/analyticsRoutes");

const app = express();
app.use(cors({ origin: '*' }));
app.use(express.json());

app.use('/health', healthRoutes);
app.use("/api/upload", uploadRoutes);
app.use("/api/analytics", analyticsRoutes);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));



require("./cron/refreshJob");

app.use(errorHandler);

module.exports = app;
