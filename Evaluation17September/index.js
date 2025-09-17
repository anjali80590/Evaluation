let express = require("express");
let mongoose = require("mongoose");
let restaurantRoutes = require("./routes/restaurants");
let reviewRoutes = require("./routes/reviews");
const Logger = require("./middleware/Logger");
require("dotenv").config();
let app = express();
app.use(express.json());
app.get("/", (req, res) => {
  res.send("server started");
});

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("mongodb connected"))
  .catch((err) => console.log(err));

app.use("/api/restaurants", restaurantRoutes);
app.use("/api/reviews", reviewRoutes);

app.use(require("morgan")("combined"));
app.use("/", (req, res) => {
  res.status(404).json({ erro: "Route Not Found" });
});
app.use(Logger);

app.listen(process.env.PORT, () => {
  console.log(`http://localhost:${process.env.PORT}`);
});
