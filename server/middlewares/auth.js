import { CustomError } from "../utils/customError.js";
import jwt from "jsonwebtoken";
import verifyToken from "../utils/verifyToken.js";

const authMiddleware = async (req, res, next) => {
  try {
    // Check for token presence
    const token = req.cookies.projex_token;
    if (!token) {
      throw new CustomError("Authentication required", 401);
    }

    // Verify the token using a separate async function
    const decoded = await verifyToken(token);
    req.user = decoded;

    next();
  } catch (error) {
    // Handle errors, including potential JWT errors
    if (error instanceof jwt.JsonWebTokenError) {
      console.error("JWT verification error:", error.message); // Log for debugging
      return res.status(401).json(new CustomError("Invalid token", 401));
    } else {
      console.error("Internal server error:", error.message); // Log for debugging
      return res
        .status(500)
        .json(new CustomError("Internal Server Error", 500));
    }
  }
};

export default authMiddleware;
