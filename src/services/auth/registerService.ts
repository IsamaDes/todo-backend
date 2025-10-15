import bcrypt from "bcryptjs";
import User from "../../models/User.js";
import { generateAccessToken, generateRefreshToken } from "../../utils/tokenUtils.js";

import validateRegistrationInput from "../../utils/validate.js";


const registerUser = async (name: string, email: string, password: string, role: string) => {

  const { valid, errors, sanitized } = validateRegistrationInput({
    name,
    email,
    password,
  });

   if (!valid) {
    throw new Error(errors.join(" "));
  }

  const cleanEmail = sanitized.email.toLowerCase();

  const existing = await User.findOne({ email: email.toLowerCase() });
  if (existing) throw new Error("User already exists");

  const hashed = await bcrypt.hash(sanitized.password, 10);


  const user = new User({
    name: sanitized.name,
    email: cleanEmail,
    password: hashed,
    role,
    tokenExpiry: new Date(Date.now() + 24 * 60 * 60 * 1000),
  });

  await user.save();

  //generate tokens after user has an id
  const accessToken = generateAccessToken(user._id.toString());
  const refreshToken = generateRefreshToken(user._id.toString());

  return {
  id: user._id,
  name: user.name,
  email: user.email,
  role: user.role,
  accessToken,
  refreshToken
};
  
};

export default registerUser;
