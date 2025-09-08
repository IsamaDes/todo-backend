// routes/auth.js
const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const { generateTokenAndHash, hashToken } = require("../utils/tokenUtil");

const router = express.Router();

// helper: create JWT
function createJwt(user) {
  return jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || "1h",
  });
}

/**
 * POST /api/auth/register
 * Body: { name, email, password }
 */
router.post("/register", async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    if (!email || !password)
      return res.status(400).json({ message: "Email and password required" });

    const existing = await User.findOne({ email: email.toLowerCase() });
    if (existing)
      return res.status(409).json({ message: "User already exists" });

    // hash password with bcrypt (salt rounds 10)
    const saltRounds = 10;
    const hashed = await bcrypt.hash(password, saltRounds);

    const user = new User({
      name,
      email: email.toLowerCase(),
      password: hashed,
    });
    // optionally generate verification token
    const { token, tokenHash } = generateTokenAndHash();
    user.tokenHash = tokenHash;
    user.tokenExpiry = new Date(Date.now() + 1000 * 60 * 60 * 24); // 24h
    await user.save();

    // TODO: send `token` to user email for verification (link: /api/auth/verify?token=...)
    // For now return token in response (only for dev). In production do NOT return token in response.
    res.status(201).json({
      message: "User created. Verify email to activate account.",
      // DO NOT return token in production — only for testing/dev/demo
      verificationToken: token,
    });
  } catch (err) {
    next(err);
  }
});

/**
 * GET /api/auth/verify?token=<token>
 * - verify token using sha512 hash
 */
router.get("/verify", async (req, res, next) => {
  try {
    const { token } = req.query;
    if (!token) return res.status(400).json({ message: "Token required" });

    const tokenHash = hashToken(String(token));
    const user = await User.findOne({
      tokenHash,
      tokenExpiry: { $gt: new Date() },
    });
    if (!user)
      return res.status(400).json({ message: "Invalid or expired token" });

    user.isVerified = true;
    user.tokenHash = null;
    user.tokenExpiry = null;
    await user.save();

    res.json({ message: "Email verified. You can now login." });
  } catch (err) {
    next(err);
  }
});

/**
 * POST /api/auth/login
 * Body: { email, password }
 */
router.post("/login", async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return res.status(400).json({ message: "Email and password required" });

    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) return res.status(401).json({ message: "Invalid credentials" });

    // optionally require verification
    // if (!user.isVerified) return res.status(403).json({ message: "Please verify your email first" });

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return res.status(401).json({ message: "Invalid credentials" });

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

/**
 * GET /api/auth/me
 * Protected route example
 */
router.get("/me", async (req, res, next) => {
  // middleware will attach req.user
  if (!req.user) return res.status(401).json({ message: "Not authenticated" });
  res.json(req.user);
});

module.exports = router;
