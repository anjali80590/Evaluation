let express = require("express");
let { addComments, toggleUpvote } = require("../controllers/comentController");
let authMiddleware = require("../middleware/authMiddleware");

let router = express.Router();

router.post("/:postId/comments", authMiddleware, addComments);
router.post("/:postId/upvote", authMiddleware, toggleUpvote);

module.exports = router;
