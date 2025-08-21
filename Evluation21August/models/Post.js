let mongoose = require("mongoose");

let commentSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  text: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

let PostSchema = new mongoose.Schema(
  {
    title: { type: String, minLength: 5, required: true },
    content: { type: String, minLength: 20, required: true },
    author: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    tags: [{ type: mongoose.Schema.Types.ObjectId, ref: "Tag" }],
    upvotes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    comments: [commentSchema],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Post", PostSchema);
