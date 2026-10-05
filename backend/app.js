import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import config from "./src/config/config.js";
import authRoutes from "./src/routes/auth.routes.js";
import productRoutes from "./src/routes/product.route.js";
import requestLogger from "./src/middlewares/requestLogger.middleware.js";
import errorHandler from "./src/middlewares/errorHandler.middleware.js";
import logger from "./src/utils/logger.js";

const app = express();

// ─── Allowed Frontend Origins ─────────────────────────────────────────────────
// Add all your Vercel deployment URLs here
const ALLOWED_ORIGINS = [
  config.FRONTEND_URL,
  "https://zen-mart-woad.vercel.app",
  "https://zen-mart-okjp.vercel.app",
].filter(Boolean); // Remove undefined/null entries

// ─── Core Middlewares ────────────────────────────────────────────────────────
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (e.g. Postman, server-to-server)
      if (!origin) return callback(null, true);

      if (ALLOWED_ORIGINS.includes(origin)) {
        callback(null, true);
      } else {
        logger.warn("CORS", `Blocked request from origin: ${origin}`);
        callback(new Error(`CORS: Origin '${origin}' is not allowed`));
      }
    },
    credentials: true,
  })
);

// ─── HTTP Request Logger ─────────────────────────────────────────────────────
app.use(requestLogger);

// ─── Health Check ────────────────────────────────────────────────────────────
app.get("/", (req, res) => {
  res.json({
    message: "E-commerce API is running",
  });
});

// ─── Routes ──────────────────────────────────────────────────────────────────
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);

// ─── 404 Handler ─────────────────────────────────────────────────────────────
app.use((req, res) => {
  logger.warn("Router", `404 - Route not found: ${req.method} ${req.originalUrl}`);
  res.status(404).json({
    success: false,
    message: `Route not found: ${req.method} ${req.originalUrl}`,
  });
});

// ─── Global Error Handler ─────────────────────────────────────────────────────
app.use(errorHandler);

export default app;
