import express from 'express';
import path from 'path';
import user from '../routes/user';    
import note from '../routes/note';     
import { connectDB } from './config/database';
import cors from 'cors';
import * as dotenv from 'dotenv';     

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/users', user);
app.use('/api', note);

// Serve frontend in production
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../../frontend/dist")));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../../frontend", "dist", "index.html"));
  });
}

const port = process.env.PORT || 3000;

const startServer = async () => {
  try {
    await connectDB();
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
      console.log(`Environment: ${process.env.NODE_ENV}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

startServer();