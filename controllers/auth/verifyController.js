const express = require("express");
const verifyUser = require("../../services/auth/verificationService")


const router = express.Router();

/**
 * @swagger
 * /api/auth/verify:
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
router.post("/", async (req, res, next) => {
  try {
    const { token } = req.body;
    const response = await verifyUser(token)
    res.status(201).json(response);
    
  } catch (err) {
    next(err);
  }
});

module.exports = router;
