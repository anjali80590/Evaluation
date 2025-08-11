let Game=require('../models/gameModel')
let Publisher=require('../models/publisherModel')

exports.createGame=async(req,res)=>{
    let publisherExists=await Publisher.findById(req.body.publisher);
    if(!publisherExists)return res.status(400).json({message:"Not found"})
        let game=await Game.create(req.body)
    res.status(201).json(game);
}

exports.getAllGame=async(req,res)=>{
    let games=await Game.find().populate('publisher','name location')
    console.log(games);
    res.json(games);
}

exports.getGameById=async(req,res)=>{
    let game=await Game.findById(req.params.id).populate('publisher');
    if(!game) return res.status(404).json({message:"not found"})
        res.json(game);
}
exports.updateGameById=async(req,res)=>{
    let game=await Game.findByIdAndUpdate(req.params.id,req.body,{new:true})
      if(!game) return res.status(404).json({message:"not found"})
        res.json(game);
}
exports.deleteGame=async(req,res)=>{
    let game=await  Game.findByIdAndDelete(req.params.id);
    if(!game) return res.status(404).json({message:"not found"})
        res.json({message:"deleted"})
}