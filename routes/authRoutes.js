const express = require("express");
const register = require("../controllers/authController.js/register");
const login = require("../controllers/authController.js/login");
const verify = require("../controllers/authController.js/verify");
const me = require("../controllers/authController.js/me");

const router = express.Router();

// mount each route
router.use("/register", register);
router.use("/login", login);
router.use("/verify", verify);
router.use("/me", me);

module.exports = router;
