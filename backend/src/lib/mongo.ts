import "dotenv/config";

import mongoose from "mongoose";
export async function connectDB() {
  try {
    // console.log(process.env.MONGO_URI);

    const conn = await mongoose.connect(process.env.MONGO_URI as string);

    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error("Database connection failed:", error);

    process.exit(1);
  }
}
