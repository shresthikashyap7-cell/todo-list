"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const note_1 = require("../controllers/note");
const auth_1 = require("../middleware/auth");
router.post("/notes", auth_1.authenticate, note_1.CreateNote);
router.get("/notes", auth_1.authenticate, note_1.GetNotes);
router.get("/notes/:noteId", auth_1.authenticate, note_1.GetSingleNote);
router.put("/notes/:noteId", auth_1.authenticate, note_1.UpdateNote);
router.delete("/notes/:noteId", auth_1.authenticate, note_1.DeleteNote);
exports.default = router;
