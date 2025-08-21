let express = require("express");
let connectDB = require("./config/database");
let logger = require("./middleware/logger");
let authRoutes = require("./routes/authRoutes");
let postRoutes = require("./routes/postRoutes");
let commentRoutes = require("./routes/commentsRoutes");
let dotenv = require("dotenv");

dotenv.config();
connectDB();

let app = express();
app.use(express.json());
app.use(logger);

app.get('/',(req,res)=>{
    res.json({message:"server started"})
})

app.use("/api/auth", authRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/posts", commentRoutes);

let port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(` http://localhost:${port}`);
});
