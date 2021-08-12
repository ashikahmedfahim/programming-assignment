const User = require("../models/users");
const Post = require("../models/posts");
const dataValidations = require("../utilities/dataValidations");
const ExpressError = require("../utilities/expressError");

module.exports.getAll = async (req, res, next) => {
  const user = req.credentials._id;
  const posts = await Post.find({ user });
  res.status(200).json({ posts });
};

module.exports.createOne = async (req, res, next) => {
  const user = req.credentials._id;
  const isValidDescription = dataValidations.isValidString(req.body);
  if (isValidDescription.error) throw new ExpressError(400, isValidDescription.error.message);
  const description = req.body.description;
  console.log(description);
  const newPost = new Post({ user, description });
  const result = await newPost.save();
  if (!result) throw new ExpressError(500, "Failed to create Post");
  res.status(200).json({ result });
};

module.exports.getOne = async (req, res, next) => {};
module.exports.addUpVote = async (req, res, next) => {};
module.exports.addDownVote = async (req, res, next) => {};
module.exports.addComment = async (req, res, next) => {};
module.exports.updateOne = async (req, res, next) => {};
module.exports.deleteOne = async (req, res, next) => {};
