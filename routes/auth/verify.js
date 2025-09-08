const express = require("express");
const User = require("../../models/User");
const { hashToken } = require("../../utils/tokenUtil");

const router = express.Router();

/**
 * @swagger
 * /auth/verify:
 *   get:
 *     summary: Verify user email
 *     tags: [Auth]
 *     parameters:
 *       - in: query
 *         name: token
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Email verified
 *       400:
 *         description: Invalid or expired token
 */
router.get("/", async (req, res, next) => {
  try {
    const { token } = req.query;
    if (!token) return res.status(400).json({ message: "Token required" });

    const tokenHash = hashToken(token);
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

module.exports = router;
