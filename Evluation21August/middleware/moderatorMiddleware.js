let moderatorMiddleware = (req, res, next) => {
  if (req.user.role !== "Moderator")
    return res.status(403).json({ message: "Access denied" });
  next();
};

module.exports = moderatorMiddleware;
