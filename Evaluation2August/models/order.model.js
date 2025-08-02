let mongoose = require("mongoose");
let orderSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId,
     ref: "user",
      required: true },
  products: [
    {
      productId:
      { type: mongoose.Schema.Types.ObjectId,
         ref: "Product" },
      quantity: { type: Number,
         required: true },
      totalAmount: { type: Number, 
        required: true },
      price: 
      { type: Number,
         required: true },

      orderedAt:
       { type: Date,
         default: Date.now },

      createdAt: {
        type: Date,
        default: Date.now,
      },
    },
  ],
});
module.exports = mongoose.model("Order", orderSchema);
