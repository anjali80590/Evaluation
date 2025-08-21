let mongoose = require("mongoose");
let connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("mongdb connected");
  } catch (err) {
    console.log(err);
    return;
  }
};
module.exports = connectDB;
