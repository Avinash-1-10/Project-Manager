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
    // generaate token for 10 days
    expiresIn: "10d",
  };

  // Generate the token using the secret key
  const token = jwt.sign(payload, process.env.JWT_SECRET, options);

  return token;
};

export default generateToken;
