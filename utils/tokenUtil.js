// utils/tokenUtil.js
const crypto = require("crypto");

function generateTokenAndHash() {
  // generate a random token (sent to user) and also a server-side hash to store
  const token = crypto.randomBytes(32).toString("hex"); // visible token (send by email)
  const tokenHash = crypto.createHash("sha512").update(token).digest("hex"); // store this
  return { token, tokenHash };
}

function hashToken(token) {
  return crypto.createHash("sha512").update(token).digest("hex");
}

module.exports = { generateTokenAndHash, hashToken };
