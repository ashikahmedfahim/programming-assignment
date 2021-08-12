const User = require("../models/users");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dataValidations = require("../utilities/dataValidations");
const ExpressError = require("../utilities/expressError");

module.exports.getAll = async (req, res, next) => {};

module.exports.createOne = async (req, res, next) => {
  const isValidData = dataValidations.isValidUserData(req.body);
  if (isValidData.error) throw new ExpressError(400, isValidData.error.message);
  const isAlreadyRegistered = await User.findOne({ email: req.body.email });
  if (isAlreadyRegistered)
    throw new ExpressError(400, "This E-mail is Already Registered");
  const salt = await bcrypt.genSalt(12);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);
  const user = new User({
    email: req.body.email,
    password: hashedPassword,
  });
  const result = await user.save();
  if (!result) throw new ExpressError(500, "Failed to create User");
  const token = jwt.sign(
    { _id: result._id, email: result.email },
    process.env.SECRETKEY
  );
  res.status(200).header("token", token).json({ token });
};

module.exports.getOne = async (req, res, next) => {
  const user = await User.findById(req.params.id);
  if (!user) throw new ExpressError(404, "User Not Found");
  res.status(200).json(user);
};

module.exports.deleteOne = async (req, res, next) => {};

module.exports.updateOne = async (req, res, next) => {};
