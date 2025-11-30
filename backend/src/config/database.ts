import mongoose from "mongoose";
require('dotenv').config();

export const connectDB = async (): Promise<void> => {
    const mongoURI = process.env.MONGODB_URI || process.env.MONGO_URI || "mongodb://localhost:27017/todoapp";
    
    if (!mongoURI) {
        console.error("MongoDB URI is not defined in environment variables");
        process.exit(1);
    }
    
    try {
        await mongoose.connect(mongoURI);
        console.log("Connected to MongoDB successfully");
        console.log("Database:", mongoose.connection.name);
    }
    catch (error) {
        console.error("Error connecting to MongoDB:", error);
        process.exit(1); 
    }
};