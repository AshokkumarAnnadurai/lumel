const cron = require("node-cron");
const fs = require("fs");
const fastcsv = require("fast-csv");
const path = require("path");
const { processCsvData } = require("../services/csvProcessor");

function logRefresh(message) {
  const logLine = `[${new Date().toISOString()}] ${message}\n`;
  fs.appendFileSync("./logs/data-refresh.log", logLine);
}

cron.schedule("* * * * *", () => {
  const filePath = path.join(__dirname, "../data/daily_upload.csv");

  const fileRows = [];
  fs.createReadStream(filePath)
    .pipe(fastcsv.parse({ headers: true }))
    .on("data", row => fileRows.push(row))
    .on("end", async () => {
      try {
        await processCsvData(fileRows);
        logRefresh("Data refreshed successfully via CRON.");
      } catch (error) {
        logRefresh("CRON refresh failed: " + error.message);
      }
    });
});
