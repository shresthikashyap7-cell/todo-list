"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const user_1 = __importDefault(require("../routes/user"));
const note_1 = __importDefault(require("../routes/note"));
const database_1 = require("./config/database");
const cors_1 = __importDefault(require("cors"));
const dotenv = __importStar(require("dotenv"));
// Add global error handlers
process.on('uncaughtException', (error) => {
    console.error('Uncaught Exception:', error);
    process.exit(1);
});
process.on('unhandledRejection', (reason, promise) => {
    console.error('Unhandled Rejection at:', promise, 'reason:', reason);
    process.exit(1);
});
console.log('Starting application...');
dotenv.config();
console.log('Environment loaded');
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
console.log('Middleware configured');
app.use('/api/users', user_1.default);
app.use('/api', note_1.default);
console.log('Routes configured');
// Serve frontend in production
if (process.env.NODE_ENV === "production") {
    const frontendPath = path_1.default.join(__dirname, "../../frontend/dist");
    console.log('Serving static files from:', frontendPath);
    app.use(express_1.default.static(frontendPath));
    app.get("*", (req, res) => {
        res.sendFile(path_1.default.resolve(__dirname, "../../frontend", "dist", "index.html"));
    });
}
const port = process.env.PORT || 3000;
console.log('Port:', port);
const startServer = async () => {
    try {
        console.log('Attempting to connect to database...');
        await (0, database_1.connectDB)();
        console.log('Database connected successfully');
        app.listen(port, () => {
            console.log(`✓ Server is running on port ${port}`);
            console.log(`✓ Environment: ${process.env.NODE_ENV}`);
            console.log(`✓ MongoDB URI exists: ${!!process.env.MONGODB_URI}`);
        });
    }
    catch (error) {
        console.error('Failed to start server:', error);
        console.error('Error details:', JSON.stringify(error, null, 2));
        process.exit(1);
    }
};
console.log('Calling startServer...');
startServer();
