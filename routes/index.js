const express = require("express");
const authRoutes = require("./authRoutes");
const todoRoutes = require("./todoRoutes");

const router = express.Router();

router.use("/auth", authRoutes);
router.use("/auth/todos", todoRoutes);

module.exports = router;

