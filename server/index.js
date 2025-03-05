import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import mongoose from 'mongoose';
import { authRouter } from './routes/authRoutes.js';
import aiRoutes from './routes/aiRoutes.js'; // Import AI routes

dotenv.config();
const app = express();

// ✅ Allow frontend (Vite) to access backend
app.use(cors({
  origin: ["http://localhost:5173", "http://localhost:3000"], 
  credentials: true,
}));

app.use(express.json());
app.use(cookieParser());

// ✅ Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ Connected to MongoDB'))
  .catch((err) => console.error('❌ Database connection error:', err));

// ✅ API Routes
app.use('/auth', authRouter);
app.use('/ai', aiRoutes); // AI Routes

// Default route
app.get('/', (req, res) => {
  res.send("🚀 Server is running...");
});

// ✅ Start Server
const port = process.env.PORT || 5001;
app.listen(port, () => {
  console.log(`✅ Server running on port ${port}`);
});
