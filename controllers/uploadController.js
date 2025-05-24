const fs = require("fs");
const fastcsv = require("fast-csv");
const { processCsvData } = require("../services/csvProcessor");
const messages = require("../utils/messages");

exports.uploadCSV = async (req, res, next) => {
  try {
    const fileRows = [];
    const filePath = req.file.path;

    fs.createReadStream(filePath)
      .pipe(fastcsv.parse({ headers: true }))
      .on("data", row => fileRows.push(row))
      .on("end", async () => {
        try {
          await processCsvData(fileRows);
          logRefresh("Data refreshed successfully via API.");
          fs.unlinkSync(filePath);
          res.status(200).json({ message: messages.en.uploadSuccess });
        }catch(err) {
          logRefresh("Data refresh failed: " + err.message);
          next(err);
        }
      });
  } catch (err) {
    next(err);
  }
};

function logRefresh(message) {
  const log = `[${new Date().toISOString()}] ${message}\n`;
  fs.appendFileSync("logs/data-refresh.log", log);
}
