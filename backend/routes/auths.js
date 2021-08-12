const express = require("express");
const router = express.Router();
const catchAsync = require("../utilities/catchAsync");
const Auth = require("../controllers/auths");

router.post("/", catchAsync(Auth.login));

module.exports = router;