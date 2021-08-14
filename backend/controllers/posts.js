const Post = require("../models/posts");
const dataValidations = require("../utilities/dataValidations");
const ExpressError = require("../utilities/expressError");

module.exports.getAll = async (req, res, next) => {
  const posts = await Post.find({}).populate("user", "email");
  res.status(200).json(posts);
};

module.exports.createOne = async (req, res, next) => {};

module.exports.getOne = async (req, res, next) => {
  const isValidId = dataValidations.isValidObjectId(req.params.id);
  if (isValidId.error) throw new ExpressError(400, "Invalid Post ID");
  const result = await Post.findById(req.params.id)
    .populate("user", "email")
    .populate("comment.commentBy", "email")
    .populate("upVote.upVotedBy", "email")
    .populate("downVote.downVoteBy", "email");
  if (!result) throw new ExpressError("Post not found", 404);
  res.status(200).json(result);
};

module.exports.addUpVote = async (req, res, next) => {
  const isValidId = dataValidations.isValidObjectId(req.params.id);
  if (isValidId.error) throw new ExpressError(400, "Invalid Post ID");
  let post = await Post.findById(req.params.id);
  if (!post) throw new ExpressError(404, "Post not found");
  if (post.downVote.length > 0) {
    const findUserByDownVote = await Post.findOne({
      _id: req.params.id,
      "downVote.downVotedBy": req.credentials._id,
    });
    if (findUserByDownVote) {
      await Post.updateOne(
        { _id: req.params.id },
        { $pull: { downVote: { downVotedBy: req.credentials._id } } }
      );
    }
  }
  if (post.upVote.length > 0) {
    const findUserByUpVote = await Post.find({
      _id: req.params.id,
      "upVote.upVotedBy": req.credentials._id,
    });
    if (findUserByUpVote.length === 0) {
      const result = await Post.updateOne(
        { _id: req.params.id },
        { $push: { upVote: { upVotedBy: req.credentials._id } } }
      );
      if (!result) throw new ExpressError(500, "Error updating post");
    }
  } else {
    const result = await Post.updateOne(
      { _id: req.params.id },
      { $push: { upVote: { upVotedBy: req.credentials._id } } }
    );
    if (!result) throw new ExpressError(500, "Error updating post");
  }
  post = await Post.findById(req.params.id)
    .populate("user", "email")
    .populate("comment.commentBy", "email")
    .populate("upVote.upVotedBy", "email")
    .populate("downVote.downVoteBy", "email");
  res.status(200).json(post);
};

module.exports.addDownVote = async (req, res, next) => {
  const isValidId = dataValidations.isValidObjectId(req.params.id);
  if (isValidId.error) throw new ExpressError(400, "Invalid Post ID");
  let post = await Post.findById(req.params.id);
  if (!post) throw new ExpressError(404, "Post not found");
  if (post.upVote.length > 0) {
    const findUserByUpVote = await Post.findOne({
      _id: req.params.id,
      "upVote.upVotedBy": req.credentials._id,
    });
    if (findUserByUpVote) {
      await Post.updateOne(
        { _id: req.params.id },
        { $pull: { upVote: { upVotedBy: req.credentials._id } } }
      );
    }
  }
  if (post.downVote.length > 0) {
    const findUserByDownVote = await Post.find({
      _id: req.params.id,
      "downVote.downVotedBy": req.credentials._id,
    });
    if (findUserByDownVote.length === 0) {
      const result = await Post.updateOne(
        { _id: req.params.id },
        { $push: { downVote: { downVotedBy: req.credentials._id } } }
      );
      if (!result) throw new ExpressError(500, "Error updating post");
    }
  } else {
    const result = await Post.updateOne(
      { _id: req.params.id },
      { $push: { downVote: { downVotedBy: req.credentials._id } } }
    );
    if (!result) throw new ExpressError(500, "Error updating post");
  }
  post = await Post.findById(req.params.id)
  .populate("user", "email")
  .populate("comment.commentBy", "email")
  .populate("upVote.upVotedBy", "email")
  .populate("downVote.downVoteBy", "email");
  res.status(200).json(post);
};

module.exports.addComment = async (req, res, next) => {
  const isValidId = dataValidations.isValidObjectId(req.params.id);
  if (isValidId.error) throw new ExpressError(400, "Invalid Post ID");
  const post = await Post.findById(req.params.id);
  if (!post) throw new ExpressError(404, "Post not found");
  const isValidText = dataValidations.isValidComment(req.body);
  if (isValidText.error) throw new ExpressError(400, isValidText.error.message);
  const commentBy = req.credentials._id;
  const text = req.body.text;
  const comment = { commentBy, text };
  const result = await Post.findByIdAndUpdate(
    { _id: req.params.id },
    { $push: { comment: comment } },
    { new: true }
  )
  .populate("user", "email")
  .populate("comment.commentBy", "email")
  .populate("upVote.upVotedBy", "email")
  .populate("downVote.downVoteBy", "email");
  if (!result) throw new ExpressError(500, "Error updating post");
  res.status(200).json(result);
};

module.exports.deleteOne = async (req, res, next) => {};

module.exports.updateOne = async (req, res, next) => {};
