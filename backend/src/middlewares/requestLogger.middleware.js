/**
 * requestLogger.middleware.js
 * Logs every incoming HTTP request and its response status + duration.
 * Output example:
 *   --> POST /api/auth/login
 *   <-- 200 POST /api/auth/login  (34ms)
 */

import logger from "../utils/logger.js";

// Color codes for HTTP status ranges
const statusColor = (status) => {
  if (status >= 500) return "\x1b[31m"; // red
  if (status >= 400) return "\x1b[33m"; // yellow
  if (status >= 300) return "\x1b[36m"; // cyan
  if (status >= 200) return "\x1b[32m"; // green
  return "\x1b[37m";                    // white
};

const requestLogger = (req, res, next) => {
  const start = Date.now();
  const { method, originalUrl, ip } = req;

  // Log incoming request
  logger.http("Request", `--> ${method} ${originalUrl}  [IP: ${ip}]`);

  // Log body in debug (skip passwords)
  if (req.body && Object.keys(req.body).length > 0) {
    const safeBody = { ...req.body };
    if (safeBody.password) safeBody.password = "***hidden***";
    if (safeBody.confirmPassword) safeBody.confirmPassword = "***hidden***";
    logger.debug("Request", `Body: ${JSON.stringify(safeBody)}`);
  }

  // Intercept response finish to log status + duration
  res.on("finish", () => {
    const duration = Date.now() - start;
    const { statusCode } = res;
    const color = statusColor(statusCode);
    const reset = "\x1b[0m";

    logger.http(
      "Response",
      `${color}<-- ${statusCode}${reset} ${method} ${originalUrl}  (${duration}ms)`
    );
  });

  next();
};

export default requestLogger;
