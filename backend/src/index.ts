import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db';
import rateLimit from 'express-rate-limit';

import path from 'path';
import authRoutes from './routes/authRoutes';
import vehicleRoutes from './routes/vehicleRoutes';
import uploadRoutes from './routes/uploadRoutes';

// Load env vars
dotenv.config();

// Connect to database
connectDB();

const app = express();

// Body parser
app.use(express.json());

// Rate Limiting (Security)
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again after 15 minutes',
});
app.use('/api', limiter);

// Enable CORS
app.use(cors({
  origin: '*', // Allows all websites to connect (you can change this to your specific URL later)
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/vehicles', vehicleRoutes);
app.use('/api/upload', uploadRoutes);

// Static folder for uploads
app.use('/uploads', express.static(path.join(process.cwd(), 'uploads')));

// Basic route
app.get('/', (req: Request, res: Response) => {
  res.send('MotoMatch API is running...');
});

const PORT = process.env.PORT || 5000;

app.listen(Number(PORT), '0.0.0.0', () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});
