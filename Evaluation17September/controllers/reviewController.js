let Review=require('../models/reviewModel')
const Restaurant = require('../models/restaurantModel')

exports.createReview=async(req,res)=>{
try{
    let restaurant=await Restaurant.findById(req.para.restaurantId)
    if(!restaurant){
        return res.status(404).json({erro:"Restuant not Found"})
    }
    let review=new Review({...req.body,restaurant:req.params.restaurantId});
    await review.save();
    let reviews=await Review.find({restaurant:req.params.restaurantId})
    let totalRating=reviews.reduce((sum,review)=>sum+review.rating,0)
    restaurant.rating=totalRating/reviews.length;
    await restaurant.save();
    res.staus(201).json({data:review})
}
catch(err){
    res.status(400).json({err:err.message});
}
}

exports.getReviews=async(req,res)=>{
    try{
        let reviews=await Review.find({restaurant:req.params.restaurantId}).populate('resturant','name');
        res.status(200).json({count:reviews.length,data:reviews})
    }
    catch(err){
        res.status(500).json({err:err.message});
    }
}

exports.deleteReview=async(req,res)=>{
    try{
        let review=await Review.findById(req.params.reviewId);
        if(!review){
            return res.status(404).json({msg:"not found"})
        }
        await Review.findByIdAndDelete(req.params.reviewId)
        let restaurant=await  Restaurant.findById(review.restaurant)
        let reviews=await Review.find({restaurant:review.restaurant});
        if(reviews.length>0){
            let totalRating=reviews.reduce((sum,review)=>sum+review.rating,0)
    restaurant.rating=totalRating/reviews.length;
   
        }else{
            restaurant.rating=0;
        }
         await restaurant.save();
         res.status(200).json({data:{}})
    }
    catch(err){
        res.status(500).json({err:err.message})
    }
}