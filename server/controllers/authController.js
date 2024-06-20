import User from "../models/userModel.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";
import { CustomError } from "../utils/customError.js";
import generateToken from "../utils/generateToken.js";
import setCookies from "../utils/setCookies.js";
import bcrypt from "bcryptjs";

export const login = asyncHandler(async (req, res, next) => {
  const { emailOrUsername, password } = req.body;
  
  if (!emailOrUsername || !password) {
    return next(new CustomError("All fields are required", 400));
  }

  const existingUser = await User.findOne({
    $or: [{ email: emailOrUsername }, { username: emailOrUsername }],
  }).select("+password");

  if (!existingUser) {
    return next(new CustomError("User does not exist", 404));
  }

  const isMatch = await bcrypt.compare(password, existingUser.password);
  if (!isMatch) {
    return next(new CustomError("Invalid credentials", 401));
  }

  // Generate JWT token
  const token = await generateToken(existingUser._id);

  // Set cookies
  setCookies(res, token);

  // Exclude the password from the response
  const { password: _, ...userWithoutPassword } = existingUser.toObject();

  return res.status(200).json(
    new ApiResponse(200, "Login successful", {
      user: userWithoutPassword,
      projex_token: token,
    })
  );
});
