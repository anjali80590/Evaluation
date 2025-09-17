let express = require("express");
let mongoose = require("mongoose");
let restaurantRoutes = require("./routes/restaurants");
let reviewRoutes = require("./routes/reviews");
let morgan=require('morgan');
require("dotenv").config();

let app = express();

app.use(express.json());
app.use(morgan('dev'));

app.get("/", (req, res) => {
  res.send("server started");
});

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("mongodb connected"))
  .catch((err) => console.log(err));

app.use("/api/restaurants", restaurantRoutes);
app.use("/api/reviews", reviewRoutes);

app.use ((req, res,next,) => {
  res.status(404).json({ error: "Route Not Found" });
});
;

app.listen(process.env.PORT, () => {
  console.log(`http://localhost:${process.env.PORT}`);
});
