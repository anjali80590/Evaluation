let express=require('express');
let mongoose=require("mongoose")
let morgan=require('morgan');
let productRoutes=require('./routes/product.routes')
let orderRoutes=require('./routes/order.routes')
let userRoutes=require('./routes/user.routes')

let app=express();
app.use(express.json());
app.use(morgan('dev'));

app.use('/products',productRoutes)
app.use('/users',userRoutes)
app.use('/orders',orderRoutes)

app.get('/',(req,res)=>{
    res.send({message:"server Started"})
})


mongoose.connect(
  "mongodb+srv://anjaliyadav80590:anjali@cluster0.uzvshmh.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
).then(()=>{
    console.log("mongodb conect");
    app.listen(5000,()=>{
        console.log("http://localhost:5000")
    })
}).catch(err=>console.log(err))