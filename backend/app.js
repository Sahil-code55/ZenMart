import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import config from "./src/config/config.js";
import authRoutes from "./src/routes/auth.routes.js";
import productRoutes from "./src/routes/product.route.js";

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: config.CLIENT_URL || "http://localhost:5173",
    credentials: true,
  })
);

app.get("/", (req, res) => {
  res.json({
    message: "E-commerce API is running",
  });
});

app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);

// 404 Handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

// Global JSON error handler
app.use((err, req, res, next) => {
  console.error("Unhandled error:", err);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Internal server error",
  });
});

export default app;
