import mongoose from "mongoose";
import config from "./config.js";
import logger from "../utils/logger.js";

const connectToDB = async () => {
  try {
    if (!config.MONGO_URI) {
      throw new Error("MONGO_URI is missing in environment variables (.env).");
    }

    logger.db("MongoDB", "Connecting to database...");

    const conn = await mongoose.connect(config.MONGO_URI);

    logger.success(
      "MongoDB",
      `Connected successfully → Host: ${conn.connection.host}  DB: ${conn.connection.name}`
    );

    // Log when connection drops
    mongoose.connection.on("disconnected", () => {
      logger.warn("MongoDB", "Connection lost. Attempting to reconnect...");
    });

    mongoose.connection.on("reconnected", () => {
      logger.success("MongoDB", "Reconnected successfully");
    });

    mongoose.connection.on("error", (err) => {
      logger.error("MongoDB", "Connection error", err);
    });

  } catch (error) {
    logger.error("MongoDB", `Connection failed: ${error.message}`, error);
    process.exit(1);
  }
};

export default connectToDB;