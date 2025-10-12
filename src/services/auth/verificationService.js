const User = require("../../models/User");
const { hashToken } = require("../../utils/tokenUtil");


async function verifyUser(token){
    if (!token) throw new Error("Token required" );

    const tokenHash = hashToken(token);
    const user = await User.findOne({
      tokenHash,
      tokenExpiry: { $gt: new Date() },
    });

    if (!user) throw new Error("Invalid or expired token" );

    user.isVerified = true;
    user.tokenHash = null;
    user.tokenExpiry = null;
    await user.save();

    return {
        message: "User Verified successfully.", 
      };
}

module.exports = verifyUser;