"use strict";
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
const dotenv_1 = __importDefault(require("dotenv"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
dotenv_1.default.config();
app.use(express_1.default.json());
app.use('/api/users', user_1.default);
app.use('/api', note_1.default);
// Serve frontend in production
if (process.env.NODE_ENV === "production") {
    app.use(express_1.default.static(path_1.default.join(__dirname, "../../frontend/dist")));
    app.get("*", (req, res) => {
        res.sendFile(path_1.default.resolve(__dirname, "../../frontend", "dist", "index.html"));
    });
}
const port = process.env.PORT || 3000;
app.listen(port, async () => {
    console.log(`Server is running on port ${port}`);
    await (0, database_1.connectDB)();
});
