import express from "express";
const router = express.Router();

import { CreateNote, GetNotes, GetSingleNote, UpdateNote, DeleteNote } from "../controllers/note";
import { authenticate } from "../middleware/auth";

router.post("/notes", authenticate, CreateNote);
router.get("/notes", authenticate, GetNotes);
router.get("/notes/:noteId", authenticate, GetSingleNote);
router.put("/notes/:noteId", authenticate, UpdateNote);
router.delete("/notes/:noteId", authenticate, DeleteNote);

export default router;