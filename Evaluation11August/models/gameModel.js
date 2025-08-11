let mongoose=require('mongoose');
let gameSchema=new mongoose.Schema({
    title:{type:String,required:true}
    ,genre:{type:String ,enum:['RPG','Action','Adventure','Strategy','Sports']}
    ,releaseDate:Date,
    publisher:{type:mongoose.Schema.Types.ObjectId,ref:'Publisher',required:true}
})
module.exports=mongoose.model('Game',gameSchema);