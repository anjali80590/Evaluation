let User=require("../models/user.model")
let Order=require("../models/order.model")

exports.createUser=async(req,res,next)=>{
    try{
        let user=await User.create(req.body);
        res.status(201).json(user);
    }
    catch(err){
        console.log(err);
        next(err);
    }
}

exports.getAllUsers=async (req,res,next)=>{
    try{
        let users=await User.find();
        res.json(users);
    }
    catch(err){
        console.log(err);
        next(err);
    }
}

exports.getUsersWithOrders=async(req,res,next)=>{
    try{
        let userIds=await Order.distinct('userId');
        let users=await User.find({_id:{$in:userIds}});
        res.json(users);
    }
    catch(err){
        console.log(err);
        next(err);
    }
}