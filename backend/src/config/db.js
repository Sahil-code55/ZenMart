import mongoose from "mongoose";
import config from "./config.js";

const connectToDB = async () => {
  try {
    if (!config.MONGO_URI) {
      throw new Error("MONGO_URI is missing in environment variables (.env).");
    }
    await mongoose.connect(config.MONGO_URI);
    console.log("MongoDB is connected Successfully");
  } catch (error) {
    console.error("MongoDB connection failed:", error.message);
    process.exit(1);
  }
};

export default connectToDB;