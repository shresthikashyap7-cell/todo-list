"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoginUser = exports.RegisterUser = void 0;
const User_1 = __importDefault(require("../models/User"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const RegisterUser = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        console.log('req.body ----> ', req.body);
        const existingUser = await User_1.default.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }
        const hashedPassword = await bcrypt_1.default.hash(password, 10);
        const newUser = new User_1.default({ username, email, password: hashedPassword });
        await newUser.save();
        const payload = { _id: newUser._id, email: newUser.email };
        const token = jsonwebtoken_1.default.sign(payload, process.env.SECRET_KEY, { expiresIn: '1h' });
        res.status(201).json({ message: "User registered successfully", token });
    }
    catch (error) {
        console.log('Error in RegisterUser:', error);
        res.status(500).json({ message: "Server error", error });
    }
};
exports.RegisterUser = RegisterUser;
const LoginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User_1.default.findOne({ email });
        const passwordMatch = await bcrypt_1.default.compare(password, user?.password || "");
        if (!user || !passwordMatch) {
            return res.status(400).json("User not authorize");
        }
        const payload = { _id: user._id, email: user.email };
        if (!process.env.SECRET_KEY) {
            throw new Error("SECRET_KEY is not defined in environment variables");
        }
        const token = jsonwebtoken_1.default.sign(payload, process.env.SECRET_KEY);
        res.status(200).json({ message: "Login successful", token });
    }
    catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};
exports.LoginUser = LoginUser;
