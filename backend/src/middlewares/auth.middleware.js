import jwt from "jsonwebtoken";
import config from "../config/config.js";
import logger from "../utils/logger.js";

const authenticate = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      logger.warn("AuthMiddleware", `No authorization header → ${req.method} ${req.originalUrl}`);
      return res.status(401).json({
        success: false,
        message: "Access token required",
      });
    }

    const parts = authHeader.split(" ");

    if (parts.length !== 2 || parts[0] !== "Bearer") {
      logger.warn("AuthMiddleware", `Invalid authorization format → ${authHeader}`);
      return res.status(401).json({
        success: false,
        message: "Invalid authorization format. Use: Bearer <token>",
      });
    }

    const token = parts[1];

    const decoded = jwt.verify(token, config.ACCESS_TOKEN_SECRET);

    req.user = decoded;

    logger.debug("AuthMiddleware", `Token verified → User ID: ${decoded.userId}`);

    next();
  } catch (error) {
    logger.warn("AuthMiddleware", `Token verification failed: ${error.message}`);
    return res.status(401).json({
      success: false,
      message: "Invalid or expired access token",
    });
  }
};

export default authenticate;