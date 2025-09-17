let Restaurant = require("../models/restaurantModel");
let Review = require("../models/reviewModel");

exports.createRestaurant = async (req, res) => {
  try {
    let restaurant = new Restaurant(req.body);
    await restaurant.save();
    res.status(201).json({
      data: restaurant,
    });
  } catch (err) {
    res.status(400).json({ err: err.message });
  }
};
exports.getRestaurants = async (req, res) => {
  try {
    let restaurants = await Restaurant.find();
    res.status(200).json({ count: restaurants.length, data: restaurants });
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
};
exports.getRestaurant = async (req, res) => {
  try {
    let restaurant = await Restaurant.findById(req.params.id);
    if (!restaurant) {
      return res.status(400).json({ err: "not found" });
    }
    res.status(200).json({ data: restaurant });
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
};
exports.updateRestaurants = async (req, res) => {
  try {
    let restaurant = await Restaurant.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!restaurant) {
      return res.status(400).json({ err: "not Found" });
    }
    res.status(200).json({ data: restaurant });
  } catch (err) {
    res.status(400).json({ err: err.message });
  }
};
