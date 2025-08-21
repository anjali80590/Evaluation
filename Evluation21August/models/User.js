let mongoose = require("mongoose");
let bcrypt = require("bcrypt");

let userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, unique: true, match: /.+\@.+\..+/ },
  password: { type: String, required: true },
  role: { type: String, enum: ["User", "Moderator"], default: "User" },
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

userSchema.methods.comparePassword = function (pwd) {
  return bcrypt.compare(pwd, this.password);
};

module.exports = mongoose.model("User", userSchema);
