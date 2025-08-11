let express = require("express");
let mongoose = require("mongoose");
let dotenv = require("dotenv");
let publisherRoute = require("./routes/publisherRoutes");
let gameRoute = require("./routes/gameRoutes");
let requestTimeStamp = require("./middleware/requestTimestamp");
dotenv.config();
let app = express();
app.use(express.json());
app.use(requestTimeStamp);
app.use("/api/publishers", publisherRoute);
app.use("/api/games", gameRoute);
mongoose.connect(process.env.MONGO_URL).then(() => {
  app.listen(process.env.PORT, () => {
    console.log(`http://localhost:${process.env.PORT}`);
  });
});
