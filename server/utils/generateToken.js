import jwt from "jsonwebtoken";
import { configDotenv } from "dotenv";
configDotenv();

const generateToken = (id) => {
  // Payload data you want to include in the token
  const payload = {
    id: id,
  };

  // Options for the token (optional)
  const options = {
    expiresIn: "1h", // Token expiration time (e.g., 1 hour)
  };

  // Generate the token using the secret key
  const token = jwt.sign(payload, process.env.JWT_SECRET, options);

  return token;
};

export default generateToken;
