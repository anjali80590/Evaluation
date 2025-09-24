let express = require("express");
let mongoose = require("mongoose");
let bodyParser = require("body-parser");
let authRoutes = require("./routes/authRoutes");

require("dotenv").config();

let app = express();
app.use(bodyParser.json());
app.use("/api/auth", authRoutes);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MONGDB connected"))
  .catch((err) => console.log(err));

let PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`server Running on port ${PORT}`);
});
