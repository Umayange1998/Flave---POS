import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    const dbConnect = await mongoose.connect(process.env.MONGODB_URI);
    console.log("MongoDB connected");
  } catch (error) {
    console.log(`Error: ${error}`);
  }
};
