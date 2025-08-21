let jwt = require("jsonwebtoken");
let User = require("../models/User");

let authMiddleware = async (req, res, next) => {
  try {
    let token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(401).json({ message: "No token provided" });

    let decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id);

    if (!req.user) return res.status(401).json({ message: "Invalid token" });

    next();
  } catch {
    res.status(401).json({ message: "Unauthorized" });
  }
};

module.exports = authMiddleware;
