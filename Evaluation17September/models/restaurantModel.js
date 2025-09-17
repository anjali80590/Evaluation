let mongoose = require("mongoose");
let restaurantSchema = new mongoose.Schema({
  name: { type: String, required: true },
  cuisine: {
    type: String,
    required: true,
    enum: ["Italian", "Mexican", "Indian", "Chinese", "other"],
  },
  address: { type: String, required: true },
  averageRating: { type: Number, default: 0 },
});
let Restaurant = mongoose.model("Restaurant", restaurantSchema);
module.exports = Restaurant;
