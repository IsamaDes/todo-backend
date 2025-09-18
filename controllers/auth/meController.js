const express = require("express");
const authMiddleware = require("../../middleware/auth");

const router = express.Router();

/**
 * @swagger
 * /api/auth/me:
 *   get:
 *     summary: Get logged in user's profile
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Returns user profile
 *       401:
 *         description: Not authenticated
 */
router.get("/", authMiddleware, (req, res) => {
  res.json(req.user);
});

module.exports = router;
