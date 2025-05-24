// services/csvProcessor.js
const Customer = require("../models/customer");
const Product = require("../models/product");
const Order = require("../models/order");

exports.processCsvData = async (rows) => {
  for (const row of rows) {
    const { doc: customer } = await Customer.findOrCreate(
      { customerId: row["Customer ID"] }, // search by unique field
      {
        name: row["Customer Name"],
        email: row["Customer Email"],
        address: row["Customer Address"],
      }
    );

    const { doc: product } = await Product.findOrCreate(
      { productId: row["Product ID"] }, // search by unique field
      {
        name: row["Product Name"],
        category: row["Category"],
        unitPrice: parseFloat(row["Unit Price"]),
      }
    );

    await Order.updateOne(
      { orderId: row["Order ID"] },
      {
        orderId: row["Order ID"],
        product: product._id,
        customer: customer._id,
        dateOfSale: new Date(row["Date of Sale"]),
        quantitySold: parseInt(row["Quantity Sold"]),
        discount: parseFloat(row["Discount"]),
        shippingCost: parseFloat(row["Shipping Cost"]),
        region: row["Region"],
        paymentMethod: row["Payment Method"],
      },
      { upsert: true }
    );
  }
};

