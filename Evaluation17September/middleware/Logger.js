module.exports=(req,res,next)=>{
    console.log('request method url',req.url);
    next();
}
