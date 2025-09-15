const express = require("express");
const bcrypt = require("bcryptjs");
const User = require("../../models/User");
const { generateTokenAndHash } = require("../../utils/tokenUtil");

const router = express.Router();

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [email, password]
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: User created
 *       400:
 *         description: Missing fields
 *       409:
 *         description: User already exists
 */
router.post("/", async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    if (!email || !password)
      return res.status(400).json({ message: "Email and password required" });

    const existing = await User.findOne({ email: email.toLowerCase() });
    if (existing)
      return res.status(409).json({ message: "User already exists" });

    const hashed = await bcrypt.hash(password, 10);

    const user = new User({
      name,
      email: email.toLowerCase(),
      password: hashed,
    });

    const { token, tokenHash } = generateTokenAndHash();
    user.tokenHash = tokenHash;
    user.tokenExpiry = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24h
    await user.save();

    res.status(201).json({
      message: "User created. Verify email to activate account.",
      verificationToken: token, // ⚠️ Dev only!
    });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
