const express = require("express");
const router = express.Router({ mergeParams: true });
const catchAsync = require("../utilities/catchAsync");
const UserPost = require("../controllers/usersPosts");
const { isAuthenticated, isAuthorized } = require("../middlewares/index");

router.get("/", isAuthenticated, isAuthorized,catchAsync(UserPost.getAll));
router.post("/", isAuthenticated, isAuthorized, catchAsync(UserPost.createOne));
router.get("/:pid", isAuthenticated, isAuthorized, catchAsync(UserPost.getOne));
router.put("/:pid", catchAsync(UserPost.updateOne));
router.delete("/:pid", catchAsync(UserPost.deleteOne));

module.exports = router;
