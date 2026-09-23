import mongoose from "mongoose"
import config from "./config.js";

const connectToDB = async()=>{

   try {
    await mongoose.connect(config.MONGO_URI);
    console.log("MongoDB is connected Successfully");
   } 

   catch (error) {
    console.error("MongoDB connection failed:", error.message);
    process.exit(1);
   }

}
export default connectToDB;