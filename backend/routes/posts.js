const express = require("express");
const router = express.Router();
const catchAsync = require("../utilities/catchAsync");
const Post = require("../controllers/posts");
const { isAuthenticated, isAuthorized } = require("../middlewares/index");

router.get("/", catchAsync(Post.getAll));
router.post("/", catchAsync(Post.createOne));
router.get("/:id", catchAsync(Post.getOne));
router.put("/:id", catchAsync(Post.updateOne));
router.patch("/:id/upVote", isAuthenticated, catchAsync(Post.addUpVote));
router.patch("/:id/downVote", isAuthenticated, catchAsync(Post.addDownVote));
router.patch("/:id/comment", isAuthenticated, catchAsync(Post.addComment));
router.delete("/:id", catchAsync(Post.deleteOne));

module.exports = router;
