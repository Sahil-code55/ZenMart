/**
 * logger.js
 * A lightweight, colorized console logger for debugging.
 * Levels: INFO, WARN, ERROR, DEBUG, SUCCESS, DB, HTTP
 * Format: [TIMESTAMP] [LEVEL] [CONTEXT] message
 */

const COLORS = {
  reset: "\x1b[0m",
  bright: "\x1b[1m",
  red: "\x1b[31m",
  green: "\x1b[32m",
  yellow: "\x1b[33m",
  blue: "\x1b[34m",
  magenta: "\x1b[35m",
  cyan: "\x1b[36m",
  white: "\x1b[37m",
  gray: "\x1b[90m",
};

const LEVEL_STYLES = {
  INFO:    { color: COLORS.cyan,    label: "INFO   " },
  WARN:    { color: COLORS.yellow,  label: "WARN   " },
  ERROR:   { color: COLORS.red,     label: "ERROR  " },
  DEBUG:   { color: COLORS.magenta, label: "DEBUG  " },
  SUCCESS: { color: COLORS.green,   label: "SUCCESS" },
  DB:      { color: COLORS.blue,    label: "DB     " },
  HTTP:    { color: COLORS.white,   label: "HTTP   " },
};

const getTimestamp = () =>
  new Date().toISOString().replace("T", " ").replace("Z", "");

/**
 * Core log function.
 * @param {string} level   - Log level key (INFO, WARN, ERROR, etc.)
 * @param {string} context - Where the log is from (e.g. "AuthController")
 * @param {string} message - The log message
 * @param {any}    extra   - Optional extra data (object or Error)
 */
const log = (level, context, message, extra = null) => {
  const style = LEVEL_STYLES[level] || LEVEL_STYLES.INFO;
  const timestamp = getTimestamp();

  const prefix = [
    `${COLORS.gray}[${timestamp}]${COLORS.reset}`,
    `${style.color}${COLORS.bright}[${style.label}]${COLORS.reset}`,
    `${COLORS.cyan}[${context}]${COLORS.reset}`,
  ].join(" ");

  const output = `${prefix} ${message}`;

  if (level === "ERROR") {
    console.error(output);
  } else if (level === "WARN") {
    console.warn(output);
  } else {
    console.log(output);
  }

  // Print extra data: error stack or object details
  if (extra !== null && extra !== undefined) {
    if (extra instanceof Error) {
      console.error(`${COLORS.gray}  Stack: ${extra.stack}${COLORS.reset}`);
    } else if (typeof extra === "object") {
      console.log(
        `${COLORS.gray}  Data:${COLORS.reset}`,
        JSON.stringify(extra, null, 2)
      );
    } else {
      console.log(`${COLORS.gray}  Extra: ${extra}${COLORS.reset}`);
    }
  }
};

// Public API
const logger = {
  info:    (ctx, msg, extra) => log("INFO",    ctx, msg, extra),
  warn:    (ctx, msg, extra) => log("WARN",    ctx, msg, extra),
  error:   (ctx, msg, extra) => log("ERROR",   ctx, msg, extra),
  debug:   (ctx, msg, extra) => log("DEBUG",   ctx, msg, extra),
  success: (ctx, msg, extra) => log("SUCCESS", ctx, msg, extra),
  db:      (ctx, msg, extra) => log("DB",      ctx, msg, extra),
  http:    (ctx, msg, extra) => log("HTTP",    ctx, msg, extra),
};

export default logger;
