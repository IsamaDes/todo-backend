const express = require("express");
const register = require("../controllers/auth/registerController");
const login = require("../controllers/auth/loginController");
const verify = require("../controllers/auth/verifyController");
const me = require("../controllers/auth/meController");

const router = express.Router();

// mount each route
router.use("/register", register);
router.use("/login", login);
router.use("/verify", verify);
router.use("/me", me);

module.exports = router;
