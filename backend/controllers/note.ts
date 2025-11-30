import Note from '../models/Note';
import { Request, Response } from 'express';
import mongoose from 'mongoose';

export const CreateNote = async (req: Request, res: Response) => {
    const {status, title, description } = req.body;
    try {
        const newNote = new Note({status, title, description, user: req.user?._id });
        await newNote.save();
        res.status(201).json({ message: 'Note created successfully', note: newNote });
    }
    catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }   
};

export const GetNotes = async (req: Request, res: Response) => {
    try {
        const notes = await Note.find({ user: req.user?._id });
        res.status(200).json({ notes });
    }
    catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }   
};  
export const GetSingleNote = async (req: Request, res: Response) => {
    try {
        const { noteId } = req.params;
        const note = await Note.findOne({_id: noteId, user: req.user?._id });
        res.status(200).json({ note });
    }
    catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }   
};  

export const UpdateNote = async (req: Request, res: Response) => {
    const { noteId } = req.params;
    const {status, title, description } = req.body;    
    try {
        const updatedNote = await Note.findOneAndUpdate(
            { _id: noteId, user: req.user?._id }, 
            { status, title, description }, 
            { new: true }
        );
        if (!updatedNote) {
            return res.status(404).json({ message: 'Note not found or not authorized' });
        }   
        res.status(200).json({ message: 'Note updated successfully', note: updatedNote });
    }
    catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }   
};

export const DeleteNote = async (req: Request, res: Response) => {
    const { noteId } = req.params;
    try {   
        const deletedNote = await Note.findOneAndDelete({ _id: noteId, user: req.user?._id });
        if (!deletedNote) {
            return res.status(404).json({ message: 'Note not found or not authorized' });
        }
        res.status(200).json({ message: 'Note deleted successfully' });
    }
    catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};
