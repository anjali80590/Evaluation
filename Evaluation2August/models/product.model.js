let mongoose = require("mongoose");
let productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: {
    type: String,
    required: true,
    enum: ["electronics", "clothing", "home", "inventory"],
    price: { type: Number, required: true, min: 1 },
    inStock: { type: Boolean, default: true },
    createdAt: { type: Date, default: Date.now },
  },
});
module.exports = mongoose.model("Product", productSchema);
