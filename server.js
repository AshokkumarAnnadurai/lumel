// server.js
const app = require("./app");
const mongoose = require("mongoose");

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true }).then(() => {
  console.log("MongoDB Connected");
  app.listen(process.env.PORT || 8000, () => console.log("Server running"));
});
