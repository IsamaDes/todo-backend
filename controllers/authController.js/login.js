const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../../models/User");
const errorHandler = require("../../middleware/errorMiddleware")

const router = express.Router();

// helper
function createJwt(user) {
  return jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || "1h",
  });
}

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Login a user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [email, password]
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Returns JWT and user data
 *       401:
 *         description: Invalid credentials
 */
router.post("/", async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return res.status(400).json({ message: "Email and password required" });

    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) return errorHandler.invalidCredentials;

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return errorHandler.invalidCredentials;

    const token = createJwt(user);

    res.json({
      token,
      user: { id: user._id, email: user.email, name: user.name },
      expiresIn: process.env.JWT_EXPIRES_IN || "1h",
    });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
