"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticate = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const User_1 = __importDefault(require("../models/User"));
const authenticate = async (req, res, next) => {
    try {
        const authHeader = req.header('Authorization');
        if (!authHeader) {
            return res.status(401).json({ success: false, message: 'No token provided' });
        }
        const token = authHeader.replace('Bearer ', '');
        console.log('token ----> ', token);
        const decoded = jsonwebtoken_1.default.verify(token, process.env.SECRET_KEY);
        if (!decoded || !decoded._id) {
            return res.status(401).json({ success: false, message: 'Invalid token' });
        }
        console.log('in middleware *** ', decoded);
        const user = await User_1.default.findById(decoded._id);
        if (!user) {
            return res.status(401).json({ success: false, message: 'User not found' });
        }
        req.user = user;
        next();
    }
    catch (err) {
        console.log('Authentication error:', err);
        return res.status(401).json({ success: false, message: 'Authentication failed' });
    }
};
exports.authenticate = authenticate;
