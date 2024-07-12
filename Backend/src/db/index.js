import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";
import conf from "../../conf/conf.js"

const connectDB = async () => {
  try {
    const connectionInstance = await mongoose.connect(
      `${conf.mongodbUri}/${DB_NAME}`
    );
    console.log("Connected to the database", connectionInstance.connections[0].name);
  } catch (error) {
    console.log("MONGODB connection error in db/index.js", error);
    process.exit(1);
  }
};

export default connectDB;