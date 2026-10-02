import express from "express";
import jwt from "jsonwebtoken";
import config from "../config/config.js";
import { login, register, getMe, refreshAccessToken, logout } from "../controllers/auth.controller.js";
import { loginValidator, registerValidator } from "../validators/auth.validator.js";
import validate from "../middlewares/validate.middleware.js";
import authenticate from "../middlewares/auth.middleware.js";

const router = express.Router();

const optionalAuthenticate = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith("Bearer ")) {
    const token = authHeader.split(" ")[1];
    try {
      const decoded = jwt.verify(token, config.ACCESS_TOKEN_SECRET);
      req.user = decoded;
    } catch {
      // Expired or invalid access token - continue so logout can still clear refresh token & cookie
    }
  }
  next();
};

router.post(
  "/register",
  registerValidator,
  validate,
  register
);

router.post(
  "/login",
  loginValidator,
  validate,
  login
);

router.get(
  "/me",
  authenticate,
  getMe
);

router.post(
  "/refresh-token",
  refreshAccessToken
);

router.post(
  "/logout",
  optionalAuthenticate,
  logout
);

export default router;