import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import config from "../config/config.js";
import {
  generateAccessToken,
  generateRefreshToken,
} from "../utils/token.js";
import logger from "../utils/logger.js";

const normalizeEmail = (email = "") => email.trim().toLowerCase();

const createUserResponse = (user) => ({
  id: user._id,
  name: user.name,
  email: user.email,
  createdAt: user.createdAt,
});

// ─── Register ─────────────────────────────────────────────────────────────────
const register = async (req, res) => {
  logger.info("AuthController", "Register attempt");

  try {
    const { name, email, password } = req.body;
    const trimmedName = String(name || "").trim();
    const normalizedEmail = normalizeEmail(email);

    logger.debug("AuthController", `Register payload → name: "${trimmedName}", email: "${normalizedEmail}"`);

    if (!trimmedName || !normalizedEmail || !password) {
      logger.warn("AuthController", "Register failed: missing required fields");
      return res.status(400).json({
        success: false,
        message: "Name, email, and password are required",
      });
    }

    const existingUser = await User.findOne({ email: normalizedEmail });

    if (existingUser) {
      logger.warn("AuthController", `Register failed: email already exists → ${normalizedEmail}`);
      return res.status(409).json({
        success: false,
        message: "Email already registered",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name: trimmedName,
      email: normalizedEmail,
      password: hashedPassword,
    });

    logger.success("AuthController", `User registered successfully → ID: ${user._id}, Email: ${normalizedEmail}`);

    return res.status(201).json({
      success: true,
      message: "User registered successfully",
      user: createUserResponse(user),
    });
  } catch (error) {
    logger.error("AuthController", `Register error: ${error.message}`, error);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// ─── Login ────────────────────────────────────────────────────────────────────
const login = async (req, res) => {
  logger.info("AuthController", "Login attempt");

  try {
    const { email, password } = req.body;
    const normalizedEmail = normalizeEmail(email);

    logger.debug("AuthController", `Login attempt for email: "${normalizedEmail}"`);

    const user = await User.findOne({ email: normalizedEmail });

    if (!user) {
      logger.warn("AuthController", `Login failed: user not found → ${normalizedEmail}`);
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!isPasswordCorrect) {
      logger.warn("AuthController", `Login failed: wrong password for → ${normalizedEmail}`);
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    const accessToken = generateAccessToken(user._id);
    const refreshToken = generateRefreshToken(user._id);

    user.refreshToken = refreshToken;
    await user.save();

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: config.NODE_ENV === "production",
      sameSite: config.NODE_ENV === "production" ? "none" : "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    logger.success("AuthController", `Login successful → User ID: ${user._id}, Email: ${normalizedEmail}`);

    return res.status(200).json({
      success: true,
      message: "Login successful",
      accessToken,
      user: createUserResponse(user),
    });
  } catch (error) {
    logger.error("AuthController", `Login error: ${error.message}`, error);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// ─── Get Me ───────────────────────────────────────────────────────────────────
const getMe = async (req, res) => {
  try {
    const userId = req.user?.userId;

    logger.debug("AuthController", `getMe → User ID: ${userId}`);

    if (!userId) {
      logger.warn("AuthController", "getMe failed: no userId in token");
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    const user = await User.findById(userId).select("-password -refreshToken");

    if (!user) {
      logger.warn("AuthController", `getMe failed: user not found → ID: ${userId}`);
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    logger.info("AuthController", `getMe success → User: ${user.email}`);

    return res.status(200).json({
      success: true,
      user: createUserResponse(user),
    });
  } catch (error) {
    logger.error("AuthController", `getMe error: ${error.message}`, error);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// ─── Refresh Access Token ─────────────────────────────────────────────────────
const refreshAccessToken = async (req, res) => {
  logger.info("AuthController", "Token refresh attempt");

  try {
    const refreshToken = req.cookies?.refreshToken;

    if (!refreshToken) {
      logger.warn("AuthController", "Token refresh failed: no refresh token cookie");
      return res.status(401).json({
        success: false,
        message: "Refresh token required",
      });
    }

    const decoded = jwt.verify(refreshToken, config.REFRESH_TOKEN_SECRET);
    logger.debug("AuthController", `Refresh token decoded → User ID: ${decoded.userId}`);

    const user = await User.findById(decoded.userId);

    if (!user || user.refreshToken !== refreshToken) {
      logger.warn("AuthController", `Token refresh failed: token mismatch or user not found → ID: ${decoded.userId}`);
      return res.status(401).json({
        success: false,
        message: "Invalid refresh token",
      });
    }

    const accessToken = generateAccessToken(user._id);

    logger.success("AuthController", `Access token refreshed → User: ${user.email}`);

    return res.status(200).json({
      success: true,
      accessToken,
    });
  } catch (error) {
    logger.warn("AuthController", `Token refresh error: ${error.message}`);
    return res.status(401).json({
      success: false,
      message: "Invalid or expired refresh token",
    });
  }
};

// ─── Logout ───────────────────────────────────────────────────────────────────
const logout = async (req, res) => {
  logger.info("AuthController", "Logout attempt");

  try {
    let userId = req.user?.userId;

    if (!userId && req.cookies?.refreshToken) {
      try {
        const decoded = jwt.verify(
          req.cookies.refreshToken,
          config.REFRESH_TOKEN_SECRET
        );
        userId = decoded.userId;
        logger.debug("AuthController", `Logout: resolved user from refresh token → ID: ${userId}`);
      } catch {
        // Expired/invalid refresh token, proceed to clear cookie
        logger.debug("AuthController", "Logout: refresh token invalid/expired, clearing cookie anyway");
      }
    }

    if (userId) {
      await User.findByIdAndUpdate(userId, { refreshToken: null });
      logger.info("AuthController", `Refresh token cleared for user → ID: ${userId}`);
    }

    res.clearCookie("refreshToken", {
      httpOnly: true,
      secure: config.NODE_ENV === "production",
      sameSite: config.NODE_ENV === "production" ? "none" : "strict",
    });

    logger.success("AuthController", `Logout successful → User ID: ${userId || "unknown"}`);

    return res.status(200).json({
      success: true,
      message: "Logout successful",
    });
  } catch (error) {
    logger.error("AuthController", `Logout error: ${error.message}`, error);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export { register, login, getMe, refreshAccessToken, logout };
