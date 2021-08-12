const joi = require("joi");
joi.objectId = require("joi-objectid")(joi);

module.exports.isValidUserData = (value) => {
  const schema = joi.object({
    email: joi.string().email().required(),
    password: joi.string().min(8).required(),
  });
  const isValidUserData = schema.validate(value);
  return isValidUserData;
};

module.exports.isValidString = (value) => {
  const schema = joi.object( {description: joi.string().required()} );
  const isString = schema.validate(value);
  return isString;
};
