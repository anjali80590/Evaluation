let mongoose=require('mongoose');
let publisherSchema=new mongoose.Schema({
    name:{type:String,required:true,unique:true}
    ,location:String,
    yearEstablished:{type:Number,min:1950}

})
module.exports=mongoose.model('Publisher',publisherSchema)