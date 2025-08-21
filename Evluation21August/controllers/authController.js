let User = require("../models/User");
let jwt = require("jsonwebtoken");

let register = async (req, res) => {
  try {
    let user = await User.create(req.body);
    res.json(user);
    console.log(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
    console.log(err);
  }
};

let login = async (req, res) => {
  try {
    let { email, password } = req.body;
    let user = await User.findOne({ email });
    if (!user) return res.status(400).json({ msg: "User not found" });

    let isMatch = await user.comparePassword(password);
    if (!isMatch) return res.status(400).json({ msg: "Invalid credentials" });

    let token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.json({ msg: "Login", token });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: err.message });
  }
};

module.exports = { register, login };
