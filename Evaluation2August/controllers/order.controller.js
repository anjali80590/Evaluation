let Order=require('../models/order.model')
let Product=require('../models/product.model')

exports.createOrder=async(req,res,next)=>{
    try{
        let {userId,products}=req.body;
        console.log(req.body)
        let detailedProducts=await Promise.all(products.map(async(p)=>{
            let prod=await Product.findById(p.productId);
            console.log(prod)
            return{
                productId:p.productId,
                quantity:p.quantity,
                price:prod.price,
                totalAmount:prod.price*p.quantity,
                orderedAt:new Date()
            }
        }))

        let order=await Order.create({userId,products:detailedProducts})
        res.status(201).json(order);
    }
    catch(err){
        console.log(err);
        next(err);
    }
}

exports.getOrder=async(req,res,next)=>{
    try{
        let order=await Order.findById(req.params.id).populate('userId').populate('products,productId');
        res.json(order);
    }
    catch(err){
        console.log(err);
        next(err);
    }
}

exports.deleteOrder=async(req,res,next)=>{
    try{
        await Order.findByIdAndDelete(req.params.Id);
        res.sendStatus(204);
    }
    catch(err){
        console.log(err);
        next(err);
    }
}