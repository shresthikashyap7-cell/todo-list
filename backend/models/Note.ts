import mongoose, { Document, Schema, Model, model } from "mongoose";

export interface INote extends Document {
    title: string;
    description: string;
    status: 'pending' | 'complete';
    user: mongoose.Types.ObjectId;
}

const NoteSchema: Schema<INote> = new Schema<INote>({
    title: { type: String, required: true },
    description: { type: String, required: true },
    status: { type: String, enum: ['pending', 'complete'] },
    user: { type: mongoose.Types.ObjectId, ref: "User", required: true },
}, {
    timestamps: true,
});

export const Note: Model<INote> = model<INote>("Note", NoteSchema);
export default Note;