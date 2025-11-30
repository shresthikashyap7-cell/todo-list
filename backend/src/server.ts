import express from 'express';
import path from 'path';
import user from '../routes/user';    
import note from '../routes/note';     
import { connectDB } from './config/database';
import cors from 'cors';
import * as dotenv from 'dotenv';     

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

const app = express();
app.use(cors());
app.use(express.json());

console.log('Middleware configured');

// API routes - these must come BEFORE static files
app.use('/api/users', user);
app.use('/api', note);

console.log('Routes configured');

// Serve frontend in production
if (process.env.NODE_ENV === "production") {
  const frontendPath = path.join(__dirname, "../../../frontend/dist");
  console.log('Serving static files from:', frontendPath);
  
  // Serve static files
  app.use(express.static(frontendPath));
  
  // Catch-all handler for client-side routing (Express 5 compatible)
  app.use((req, res) => {
    res.sendFile(path.join(frontendPath, "index.html"));
  });
}

const port = process.env.PORT || 3000;
console.log('Port:', port);

const startServer = async () => {
  try {
    console.log('Attempting to connect to database...');
    await connectDB();
    console.log('Database connected successfully');
    
    app.listen(port, () => {
      console.log(`✓ Server is running on port ${port}`);
      console.log(`✓ Environment: ${process.env.NODE_ENV}`);
      console.log(`✓ MongoDB URI exists: ${!!process.env.MONGODB_URI}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    console.error('Error details:', JSON.stringify(error, null, 2));
    process.exit(1);
  }
};

console.log('Calling startServer...');
startServer();