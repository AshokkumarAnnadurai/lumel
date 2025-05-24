const mongoose = require("mongoose");
const findOrCreate = require("mongoose-findorcreate");

// models/Order.js
const OrderSchema = new mongoose.Schema({
  orderId: { type: String, unique: true },
  product: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
  customer: { type: mongoose.Schema.Types.ObjectId, ref: "Customer" },
  dateOfSale: Date,
  quantitySold: Number,
  discount: Number,
  shippingCost: Number,
  region: String,
  paymentMethod: String,
});
OrderSchema.plugin(findOrCreate);
module.exports = mongoose.model("Order", OrderSchema);
