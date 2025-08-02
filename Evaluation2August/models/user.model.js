let mongoose=require('mongoose');
let userSchema=new mongoose.Schema({
    name:String,
    email:{type:String,unique:true}
    ,
    address:String,
    createdAt:{type:Date,default:Date.now}
})
module.exports=mongoose.model('User',userSchema)