const Order = require("../models/order");
const messages = require("../utils/messages");

exports.getRevenue = async (req, res, next) => {
  try {
    const { type, startDate, endDate } = req.query;

    if (!type || !startDate || !endDate) {
      return res.status(400).json({ message: messages.en.missingParams });
    }

    const match = {
      dateOfSale: {
        $gte: new Date(startDate),
        $lte: new Date(endDate),
      },
    };

    switch (type) {
      case "total": {
        // Total revenue for the date range
        const result = await Order.aggregate([
          { $match: match },
          {
            $lookup: {
              from: "products",
              localField: "product",
              foreignField: "_id",
              as: "product",
            },
          },
          { $unwind: "$product" },
          {
            $group: {
              _id: null,
              totalRevenue: {
                $sum: {
                  $multiply: [
                    "$quantitySold",
                    { $multiply: ["$product.unitPrice", { $subtract: [1, "$discount"] }] },
                  ],
                },
              },
            },
          },
        ]);
        res.json(result[0] || { totalRevenue: 0 });
        break;
      }

      case "product": {
        // Total revenue grouped by product
        const result = await Order.aggregate([
          { $match: match },
          {
            $lookup: {
              from: "products",
              localField: "product",
              foreignField: "_id",
              as: "product",
            },
          },
          { $unwind: "$product" },
          {
            $group: {
              _id: "$product.name",
              totalRevenue: {
                $sum: {
                  $multiply: [
                    "$quantitySold",
                    { $multiply: ["$product.unitPrice", { $subtract: [1, "$discount"] }] },
                  ],
                },
              },
            },
          },
        ]);
        res.json(result);
        break;
      }

      case "category": {
        // Total revenue grouped by category
        const result = await Order.aggregate([
          { $match: match },
          {
            $lookup: {
              from: "products",
              localField: "product",
              foreignField: "_id",
              as: "product",
            },
          },
          { $unwind: "$product" },
          {
            $group: {
              _id: "$product.category",
              totalRevenue: {
                $sum: {
                  $multiply: [
                    "$quantitySold",
                    { $multiply: ["$product.unitPrice", { $subtract: [1, "$discount"] }] },
                  ],
                },
              },
            },
          },
        ]);
        res.json(result);
        break;
      }

      case "region": {
        // Total revenue grouped by region
        const result = await Order.aggregate([
          { $match: match },
          {
            $lookup: {
              from: "products",
              localField: "product",
              foreignField: "_id",
              as: "product",
            },
          },
          { $unwind: "$product" },
          {
            $group: {
              _id: "$region",
              totalRevenue: {
                $sum: {
                  $multiply: [
                    "$quantitySold",
                    { $multiply: ["$product.unitPrice", { $subtract: [1, "$discount"] }] },
                  ],
                },
              },
            },
          },
        ]);
        res.json(result);
        break;
      }

      case "trend": {
        // Revenue trends over months within date range
        const result = await Order.aggregate([
          { $match: match },
          {
            $lookup: {
              from: "products",
              localField: "product",
              foreignField: "_id",
              as: "product",
            },
          },
          { $unwind: "$product" },
          {
            $group: {
              _id: {
                year: { $year: "$dateOfSale" },
                month: { $month: "$dateOfSale" },
              },
              totalRevenue: {
                $sum: {
                  $multiply: [
                    "$quantitySold",
                    { $multiply: ["$product.unitPrice", { $subtract: [1, "$discount"] }] },
                  ],
                },
              },
            },
          },
          {
            $sort: { "_id.year": 1, "_id.month": 1 },
          },
        ]);
        res.json(result);
        break;
      }

      default:
        res.status(400).json({ message: messages.en.invalidType });
    }
  } catch (err) {
    next(err);
  }
};
