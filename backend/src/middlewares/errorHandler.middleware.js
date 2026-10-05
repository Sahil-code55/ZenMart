/**
 * errorHandler.middleware.js
 * Global error handler — catches all errors passed via next(err).
 * Logs full stack trace in development, sanitized message in production.
 */

import logger from "../utils/logger.js";

const errorHandler = (err, req, res, next) => {
  const isDev = process.env.NODE_ENV !== "production";

  // Determine HTTP status
  const statusCode = err.status || err.statusCode || 500;

  // Log the error with full context
  logger.error("ErrorHandler", `${req.method} ${req.originalUrl} → ${err.message}`, err);

  // Mongoose validation errors
  if (err.name === "ValidationError") {
    const messages = Object.values(err.errors).map((e) => e.message);
    return res.status(400).json({
      success: false,
      message: "Validation failed",
      errors: messages,
    });
  }

  // Mongoose duplicate key error (e.g. unique email)
  if (err.code === 11000) {
    const field = Object.keys(err.keyValue || {})[0] || "field";
    return res.status(409).json({
      success: false,
      message: `Duplicate value for '${field}'. Please use a different value.`,
    });
  }

  // JWT errors
  if (err.name === "JsonWebTokenError") {
    return res.status(401).json({
      success: false,
      message: "Invalid token",
    });
  }

  if (err.name === "TokenExpiredError") {
    return res.status(401).json({
      success: false,
      message: "Token has expired",
    });
  }

  // Mongoose CastError (invalid ObjectId)
  if (err.name === "CastError") {
    return res.status(400).json({
      success: false,
      message: `Invalid value for field '${err.path}'`,
    });
  }

  // Generic fallback
  return res.status(statusCode).json({
    success: false,
    message: err.message || "Internal server error",
    // Only include stack trace in development
    ...(isDev && { stack: err.stack }),
  });
};

export default errorHandler;
