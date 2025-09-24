let User = require("../models/User");
let jwt = require("jsonwebtoken");
let crypto = require("crypto");
let nodemailer = require("nodemailer");
require("dotenv").config();

let generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "1h" });
};

const transporter = nodemailer.createTransport({
  host: "smtp.ethereal.email",
  port: 587,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});
exports.register = async (req, res) => {
  let { email, password } = req.body;
  try {
    let user = await User.create({ email, password });
    res.status(201).json({ token: generateToken(user._id) });
  } catch (err) {
    res.status(400).json({ message: "user already exists" });
  }
};

exports.login = async (req, res) => {
  let { email, password } = req.body;
  let user = await User.findOne({ email });
  if (user && (await user.matchPassword(password))) {
    res.json({ token: generateToken(user._id) });
  } else {
    res.status(401).json({ message: "invalid" });
  }
};

exports.forgotPassword = async (req, res) => {
  let { email } = req.body;
  let user = await User.findOne({ email });
  if (user) {
    let resetToken = crypto.randomBytes(20).toString("hex");
    user.passwordResetToken = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");
    user.passwordResetExpires = new Date(Date.now() + 10 * 60 * 1000);
    await user.save();
    let resetUrl = `http://localhost:4000/api/auth/reset-password/${resetToken}`;
    await transporter.sendMail({
      from: `'Support' <${process.env.EMAIL_USER}`,
      to: process.env.EMAIL_USER,
      subject: "Password Reset",
      text: `Reset your password ${resetUrl}`,
    });
  }
  res.json({ message: "If email exists password reset link sent" });
};

exports.resetPassword = async (req, res) => {
  let hashedToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");
  let user = await User.findOne({
    passwordResetToken: hashedToken,
    passwordResetExpires: { $gt: Date.now() },
  });
  if (!user) {
    return res.status(400).json({ message: "token expired" });
  }
  user.password = req.body.password;
  user.passwordResetExpires = undefined;
  user.passwordResetToken = undefined;
  await user.save();
  res.json({ message: "Password reset Successfull" });
};
