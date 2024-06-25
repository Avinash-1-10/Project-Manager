import User from "../models/userModel.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";
import { CustomError } from "../utils/customError.js";
import bcrypt from "bcryptjs";

// Controller function to create a new user
export const createUser = asyncHandler(async (req, res, next) => {
  const { firstName, lastName, username, email, password } = req.body; // Destructuring the request body to get user details

  // Check if all required fields are provided
  if (!firstName || !lastName || !username || !email || !password) {
    return next(new CustomError("All fields are required", 400)); // Return error if any field is missing
  }

  // Check if the user already exists with the same email or username
  const existingUser = await User.findOne({ $or: [{ email }, { username }] });
  if (existingUser) {
    return next(new CustomError("User already exists", 409)); // Return error if user already exists
  }
  
  // hashing the password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // Creating a new user in the database
  const user = await User.create({
    firstName,
    lastName,
    username,
    email,
    password:hashedPassword,
  });

  // Return success response with the created user data
  return res
    .status(201)
    .json(new ApiResponse(201, "User created successfully", user));
});

// Controller function to get all users
export const getUsers = asyncHandler(async (req, res, next) => {
  const users = await User.find(); // Fetching all users from the database

  if (!users) {
    return next(new CustomError("No users found", 404));
  }

  // Return success response with the list of users
  return res
    .status(200)
    .json(new ApiResponse(200, "Users fetched successfully", users));
});

// Controller function to get a user by ID
export const getUserById = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.params.id); // Fetching a user by ID from the database

  if (!user) {
    return next(new CustomError("User not found", 404));
  }

  // Return success response with the user data
  return res
    .status(200)
    .json(new ApiResponse(200, "User fetched successfully", user));
});

// Controller function to get a user by query parameters (username or email)
export const getUserByQuery = asyncHandler(async (req, res, next) => {
  // Destructuring the query parameters
  const { username, email } = req.query;

  // Check if at least one query parameter is provided
  if (!username && !email) {
    return next(new CustomError("Please provide a username or email", 400));
  }

  // Finding a user matching any of the provided query parameters
  const user = await User.findOne({ $or: [{ username }, { email }] });

  if (!user) {
    return next(new CustomError("User not found", 404));
  }

  // Return success response with the user data
  return res
    .status(200)
    .json(new ApiResponse(200, "User fetched successfully", user));
});
