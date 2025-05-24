const mongoose = require("mongoose");
const findOrCreate = require("mongoose-findorcreate");

const CustomerSchema = new mongoose.Schema({
  customerId: { type: String, unique: true },
  name: String,
  email: String,
  address: String,
});
CustomerSchema.plugin(findOrCreate);
module.exports = mongoose.model("Customer", CustomerSchema);
