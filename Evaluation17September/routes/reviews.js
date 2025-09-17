let express = require("express");
let router = express.Router();
let {
  createReview,
  getReviews,
  deleteReview,
} = require("../controllers/reviewController");

router.post("/", createReview);
router.get("/:id", getReviews);
router.delete("/:id", deleteReview);
module.exports = router;
