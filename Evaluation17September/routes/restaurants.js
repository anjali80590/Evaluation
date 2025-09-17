let express = require("express");
let router = express.Router();
let{createRestaurant,getRestaurants,getRestaurant,updateRestaurants}=require('../controllers/restaurantController')
router.post('/',createRestaurant);
router.get('/',getRestaurants)
router.get('/:id',getRestaurant)
router.put('/:id',updateRestaurants);

module.exports=router;