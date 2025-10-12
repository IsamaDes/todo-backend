const express = require("express");
const loginUser = require("../../services/auth/loginService");

const router = express.Router();

/**
 * @swagger
 * /api/auth/login:
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
    const result = await loginUser(email, password);
    res.json(result);
  } catch (err) {
    if (
      err.message === "Invalid credentials" ||
      err.message.includes("required")
    ) {
      return res.status(401).json({ message: err.message });
    }
    next(err);
  }
});

module.exports = router;
