let Post = require("../models/Post");
let Tag = require("../models/Tag");

let createPost = async (req, res) => {
  try {
    let tags = req.body.tags || [];
    let ids = await Promise.all(
      tags.map(async (n) => {
        let t = await Tag.findOne({ name: n.toLowerCase() });
        if (!t) t = await Tag.create({ name: n });
        return t._id;
      })
    );

    let post = await Post.create({
      ...req.body,
      author: req.user._id,
      tags: ids,
    });

    res.json(post);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

let getPosts = async (req, res) => {
  try {
    let filter = {};
    if (req.query.tag) {
      let tag = await Tag.findOne({ name: req.query.tag.toLowerCase() });
      if (tag) filter.tags = tag._id;
    }

    let posts = await Post.find(filter)
      .populate("author", "username")
      .populate("tags", "name");
    res.json(posts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

let getPost = async (req, res) => {
  try {
    let post = await Post.findById(req.params.postId)
      .populate("author", "username")
      .populate("comments.user", "username");
    if (!post) return res.status(404).json({ msg: "Not found" });
    res.json(post);
  } catch (err) {
    res.status(404).json({ msg: "Not found" });
  }
};

let deletePost = async (req, res) => {
  try {
    let post = await Post.findById(req.params.postId);
    if (!post) return res.status(404).json({ msg: "Not found" });

    if (
      post.author.toString() !== req.user._id.toString() &&
      req.user.role !== "Moderator"
    )
      return res.status(403).json({ msg: "Denied" });

    await post.deleteOne();
    res.json({ msg: "Deleted" });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

module.exports = { createPost, getPosts, getPost, deletePost };
