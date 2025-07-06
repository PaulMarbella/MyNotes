import mongoose from "mongoose";


export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("MongoDb Connected");
  } catch (error) {
    console.log("error", error);
    process.exit(1);
  }
};
