const mongoose = require("mongoose");
const findOrCreate = require("mongoose-findorcreate");
// models/Product.js
const ProductSchema = new mongoose.Schema({
  productId: { type: String, unique: true },
  name: String,
  category: String,
  unitPrice: Number,
});
ProductSchema.plugin(findOrCreate);
module.exports = mongoose.model("Product", ProductSchema);