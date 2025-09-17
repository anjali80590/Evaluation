let mongoose = require("mongoose");
const Restaurant = require("./restaurantModel");

let reviewSchema = new mongoose.Schema({
  text: { type: String, required: true, minLength: 10 },
  rating: { type: Number, required: true, min: 1, max: 5 },
  restaurant: { type: mongoose.Schema.Types.ObjectId, ref: 'Restaurant', required: true },
  
});
let Review = mongoose.model("Review", reviewSchema);
module.exports = Review;
