let Post = require("../models/Post");

let addComments = async (req, res) => {
  try {
    let post = await Post.findById(req.params.postId);
    if (!post) return res.status(404).json({ msg: "Not found" });

    post.comments.push({ user: req.user._id, text: req.body.text });
    await post.save();
    res.json(post);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

let toggleUpvote = async (req, res) => {
  try {
    let post = await Post.findById(req.params.postId);
    if (!post) return res.status(404).json({ msg: "Not found" });

    let userId = req.user._id;
    let alreadyUpvoted = post.upvotes.includes(userId);

    if (alreadyUpvoted) {
      post.upvotes = post.upvotes.filter(
        (id) => id.toString() !== userId.toString()
      );
      await post.save();
      return res.json({
        message: "Upvote removed",
        totalUpvotes: post.upvotes.length,
      });
    } else {
      post.upvotes.push(userId);
      await post.save();
      return res.json({
        message: "Post upvoted",
        totalUpvotes: post.upvotes.length,
      });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { addComments, toggleUpvote };
