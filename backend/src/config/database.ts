import mongoose from "mongoose";
import * as dotenv from 'dotenv';

dotenv.config();

export const connectDB = async (): Promise<void> => {
    console.log('connectDB function called');
    
    const mongoURI = process.env.MONGODB_URI || process.env.MONGO_URI;
    
    console.log('MongoDB URI exists:', !!mongoURI);
    console.log('MongoDB URI (first 20 chars):', mongoURI?.substring(0, 20));
    
    if (!mongoURI) {
        console.error("MongoDB URI is not defined in environment variables");
        console.error("Available env vars:", Object.keys(process.env).join(', '));
        throw new Error("MongoDB URI is missing");
    }
    
    try {
        console.log('Attempting mongoose.connect...');
        await mongoose.connect(mongoURI);
        console.log("✓ Connected to MongoDB successfully");
        console.log("✓ Database:", mongoose.connection.name);
    }
    catch (error) {
        console.error("✗ Error connecting to MongoDB:", error);
        throw error;
    }
};