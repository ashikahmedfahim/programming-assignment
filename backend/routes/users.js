const express = require("express");
const router = express.Router();
const catchAsync = require("../utilities/catchAsync");
const User = require("../controllers/users");
const { isAuthenticated, isAuthorized } = require("../middlewares/index");

router.get("/", catchAsync(User.getAll));
router.post("/", catchAsync(User.createOne));
router.get("/:id", catchAsync(User.getOne));
router.put("/:id", catchAsync(User.updateOne));
router.delete("/:id", catchAsync(User.deleteOne));

module.exports = router;
