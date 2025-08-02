let Product=require('../models/product.model')

exports.createProduct=async(req,res,next)=>{
    try{
        // let product=await Product.create(req.body);
        let{name,category,price}=req.body;
        let newProduct=await Product.create({name,category,price:Number(price)})
        console.log(req.body);
        res.status(201).json(newProduct);
    }
    catch(err){
        console.log(err);
        next(err);
    }
}

exports.getAllProducts=async(req,res,next)=>{
    try{
        let products=await Product.find();
        res.json(products)
    }
    catch(err){
        console.log(err);
    }
}
exports.updateProduct=async(req,res,next)=>{
    try{
        let updated=await Product.findByIdAndUpdate(req.params.id,req.body,{new:true});
        res.json(updated);
    }
    catch(err){
        console.log(err);
        next(err)
    }
}
exports.deleteProduct=async(req,res,next)=>{
    try{
        await Product.findByIdAndDelete(req.params.id);
        res.sendStatus(204);
    }
    catch(err){
        console.log(err);
        next(err);
    }
}