import User from "../models/userModel.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

// Controller function to create a new user
export const createUser = async (req, res) => {
  try {
    const { name, username, email, password } = req.body; // Destructuring the request body to get user details

    // Check if all required fields are provided
    if (!name || !username || !email || !password) {
      return res.status(400).json(new ApiError(400, "All fields are required")); // Return error if any field is missing
    }

    const user = await User.create({ name, username, email, password }); // Creating a new user in the database

    // Return success response with the created user data
    return res
      .status(201)
      .json(new ApiResponse(201, "User created successfully", user));
  } catch (error) {
    // Return error response if any exception occurs
    return res.status(500).json(new ApiError(500, error.message));
  }
};

// Controller function to get all users
export const getUsers = async (req, res) => {
  try {
    const users = await User.find(); // Fetching all users from the database

    // Return success response with the list of users
    return res
      .status(200)
      .json(new ApiResponse(200, "Users fetched successfully", users));
  } catch (error) {
    // Return error response if any exception occurs
    return res.status(500).json(new ApiError(500, error.message));
  }
};

// Controller function to get a user by ID
export const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id); // Fetching a user by ID from the database

    // Return success response with the user data
    return res
      .status(200)
      .json(new ApiResponse(200, "User fetched successfully", user));
  } catch (error) {
    // Return error response if any exception occurs
    return res.status(500).json(new ApiError(500, error.message));
  }
};

// Controller function to get a user by query parameters (username, email, or ID)
export const getUserByQuery = async (req, res) => {
  try {
    const { username, email, id } = req.query; // Destructuring the query parameters

    // Finding a user matching any of the provided query parameters
    const user = await User.findOne({ $or: [{ username }, { email }, { id }] });

    // Return success response with the user data
    return res
      .status(200)
      .json(new ApiResponse(200, "User fetched successfully", user));
  } catch (error) {
    // Return error response if any exception occurs
    return res.status(500).json(new ApiError(500, error.message));
  }
};
