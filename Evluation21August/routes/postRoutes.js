let express = require("express");
let {
  createPost,
  getPosts,
  getPost,
  deletePost,
} = require("../controllers/postController");
let authMiddleware = require("../middleware/authMiddleware");

let router = express.Router();

router.post("/", authMiddleware, createPost);
router.get("/", getPosts);
router.get("/:postId", getPost);
router.delete("/:postId", authMiddleware, deletePost);

module.exports = router;
