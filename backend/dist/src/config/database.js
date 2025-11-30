"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectDB = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
require('dotenv').config();
const connectDB = async () => {
    const mongoURI = process.env.MONGODB_URI || process.env.MONGO_URI || "mongodb://localhost:27017/todoapp";
    if (!mongoURI) {
        console.error("MongoDB URI is not defined in environment variables");
        process.exit(1);
    }
    try {
        await mongoose_1.default.connect(mongoURI);
        console.log("Connected to MongoDB successfully");
        console.log("Database:", mongoose_1.default.connection.name);
    }
    catch (error) {
        console.error("Error connecting to MongoDB:", error);
        process.exit(1);
    }
};
exports.connectDB = connectDB;
