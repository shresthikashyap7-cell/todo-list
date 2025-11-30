import User from "../models/User";
import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

export const RegisterUser = async (req: Request, res: Response) => {
    try {

        const { username, email, password } = req.body;
        console.log('req.body ----> ', req.body);
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }   
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({ username, email, password: hashedPassword });
        await newUser.save();

        const payload = { _id: newUser._id, email: newUser.email };
        const token = jwt.sign(payload, process.env.SECRET_KEY as string, { expiresIn: '1h' });

        res.status(201).json({ message: "User registered successfully", token } );
    }
    catch (error) {
        console.log('Error in RegisterUser:', error);
        res.status(500).json({ message: "Server error", error });
    }
};

export const LoginUser = async (req: Request, res: Response) => {
    try {

        const { email, password } = req.body;
        const user = await User.findOne({ email });
     
        const passwordMatch = await bcrypt.compare(password, user?.password || "");

        if (!user || !passwordMatch) {
        return res.status(400).json("User not authorize");
        }

        const payload = { _id: user._id, email: user.email };

        if (!process.env.SECRET_KEY) {
        throw new Error("SECRET_KEY is not defined in environment variables");
        }

        const token = jwt.sign(payload, process.env.SECRET_KEY);

        res.status(200).json({ message: "Login successful", token });
    }
    catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};