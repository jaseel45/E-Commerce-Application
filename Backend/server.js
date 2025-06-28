import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import { connectDB } from "./config/db.js";

// Load .env config
dotenv.config();

const app = express();

app.use(express.json());
app.use(cookieParser());

// Connect to MongoDB
connectDB();

// Import Routes
import userRoutes from "./routes/userRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";

// Use Routes
app.use("/api/users", userRoutes);
app.use("/api/admin", adminRoutes);

// 404 Error Handling
app.use((req, res) => {
  res.status(404).json({ message: "Route Not Found" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server Started at http://localhost:${PORT}`);
});









