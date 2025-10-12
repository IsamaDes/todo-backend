const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../../models/User");


function createJwt(user){
 return jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || "1h",
  })
}

async function loginUser(email, password){
  if(!email || !password){
    throw new Error("Email and password required")
  }

const user = await User.findOne({email: email.toLowerCase() });
console.log(user)
if(!user) throw new Error("User not found");

const valid = await bcrypt.compare(password, user.password);
if(!valid) throw new Error("Wrong password");

const token = createJwt(user);

return {
    token,
    user: { id: user._id, email: user.email, name: user.name },
    expiresIn: process.env.JWT_EXPIRES_IN || "1h",
  };
}

module.exports = loginUser;