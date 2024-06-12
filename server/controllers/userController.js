import User from "../models/userModel.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

export const createUser = async (req, res) => {
  try {
    const { name, username, email, password } = req.body;
    if (!name || !username || !email || !password) {
      return res.status(400).json(new ApiError(400, "All fields are required"));
    }
    const user = await User.create({ name, username, email, password });
    return res
      .staus(201)
      .json(new ApiResponse(201, "User created successfully", user));
  } catch (error) {
    return res.status(500).json(new ApiError(500, error.message));
  }
};
