let Publisher=require('../models/publisherModel')
let Game=require('../models/gameModel')

exports.createPublisher=async(req ,res)=>{
        let publisher=await Publisher.create(req.body);
        res.status(201).json(publisher);
}
exports.getPublisher=async(req,res)=>{
        let publisher=await Publisher.find();
        res.json(publisher);
}
exports.getPublisherById=async(req,res)=>{
    let publisher=await Publisher.findById(req.params.id);
    if(!publisher)return res.status(404).json({message:"not found"})
        res.json(publisher);
}
exports.updatePublisherById=async(req,res)=>{
    let publisher=await Publisher.findByIdAndUpdate(req.params.id,req.body,{new:true})
    if(!publisher) return res.status(404).json({message:"not found"})
    res.json(publisher);
}
exports.deletePublisher=async(req,res)=>{
    let publisher=await Publisher.findByIdAndDelete(req.params.id);
    if(!publisher)return res.status(404).json({message:"not found"})
        res.json({message:"Deleted"})
}
exports.getGamesbyPublisher=async(req,res)=>{
    let game=await Game.find({publisher:req.params.publisherId}).populate('publisher','name location');
    res.json(game);
}