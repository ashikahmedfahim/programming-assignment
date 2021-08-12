const User = require("../models/users");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dataValidations = require("../utilities/dataValidations");
const ExpressError = require("../utilities/expressError");

module.exports.login = async (req, res, next) => {
  console.log(req.body);
  const isValidData = dataValidations.isValidUserData(req.body);
  if (isValidData.error) throw new ExpressError(400, isValidData.error.message);
  const isUser = await User.findOne({ email: req.body.email });
  if (isUser) {
    const isValidUser = await bcrypt.compare(
      req.body.password,
      isUser.password
    );
    if (isValidUser) {
      const token = jwt.sign(
        { _id: isUser._id, email: isUser.email },
        process.env.SECRETKEY
      );
      res.status(200).header("token",token).json({ token });
    } else {
      res.status(400).json({ message: "Invalid credentials" });
    }
  } else {
    res.status(404).json({ message: "Invalid credentials" });
  }
};
