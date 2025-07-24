import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from 'cors';
import { connectDB } from "./config/db.js";
import mainRoutes from './routes/index.js';  
import { errorHandler } from './middleware/errorMiddleware.js';

// Load .env config
dotenv.config();

const app = express();

// Middlewares
app.use(cors({
  origin: true, // or use a specific origin like 'http://localhost:3000'
  credentials: true, // allow cookies to be sent
}));

app.use(express.json());
app.use(cookieParser());


// Connect to MongoDB
connectDB();

// Centralized Routes
app.use('/api', mainRoutes);

// 404 Not Found Handler (For unmatched routes)
app.use((req, res, next) => {
  res.status(404).json({ message: "Route Not Found" });
});

// Global Error Handler 
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
