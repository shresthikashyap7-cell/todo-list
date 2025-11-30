"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteNote = exports.UpdateNote = exports.GetSingleNote = exports.GetNotes = exports.CreateNote = void 0;
const Note_1 = __importDefault(require("../models/Note"));
const CreateNote = async (req, res) => {
    const { status, title, description } = req.body;
    try {
        const newNote = new Note_1.default({ status, title, description, user: req.user?._id });
        await newNote.save();
        res.status(201).json({ message: 'Note created successfully', note: newNote });
    }
    catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};
exports.CreateNote = CreateNote;
const GetNotes = async (req, res) => {
    try {
        const notes = await Note_1.default.find({ user: req.user?._id });
        res.status(200).json({ notes });
    }
    catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};
exports.GetNotes = GetNotes;
const GetSingleNote = async (req, res) => {
    try {
        const { noteId } = req.params;
        const note = await Note_1.default.findOne({ _id: noteId, user: req.user?._id });
        res.status(200).json({ note });
    }
    catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};
exports.GetSingleNote = GetSingleNote;
const UpdateNote = async (req, res) => {
    const { noteId } = req.params;
    const { status, title, description } = req.body;
    try {
        const updatedNote = await Note_1.default.findOneAndUpdate({ _id: noteId, user: req.user?._id }, { status, title, description }, { new: true });
        if (!updatedNote) {
            return res.status(404).json({ message: 'Note not found or not authorized' });
        }
        res.status(200).json({ message: 'Note updated successfully', note: updatedNote });
    }
    catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};
exports.UpdateNote = UpdateNote;
const DeleteNote = async (req, res) => {
    const { noteId } = req.params;
    try {
        const deletedNote = await Note_1.default.findOneAndDelete({ _id: noteId, user: req.user?._id });
        if (!deletedNote) {
            return res.status(404).json({ message: 'Note not found or not authorized' });
        }
        res.status(200).json({ message: 'Note deleted successfully' });
    }
    catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};
exports.DeleteNote = DeleteNote;
