const express = require("express");
const register = require("./register");
const login = require("./login");
const verify = require("./verify");
const me = require("./me");

const router = express.Router();

// mount each route
router.use("/register", register);
router.use("/login", login);
router.use("/verify", verify);
router.use("/me", me);

module.exports = router;
