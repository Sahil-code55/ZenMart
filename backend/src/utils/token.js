import jwt from "jsonwebtoken";
import config from "../config/config.js";

const generateAccessToken = (userId) => {
  return jwt.sign(
    { userId },
    config.ACCESS_TOKEN_SECRET,
    {
      expiresIn: "15m",
    }
  );
};

const generateRefreshToken = (userId) => {
  return jwt.sign(
    { userId },
    config.REFRESH_TOKEN_SECRET,
    {
      expiresIn: "7d",
    }
  );
};

export {
  generateAccessToken,
  generateRefreshToken,
};
