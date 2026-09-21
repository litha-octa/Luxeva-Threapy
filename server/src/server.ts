// 1. Import pakai ES Module syntax (bukan require lagi)
import dotenv from 'dotenv';
import express, { Request, Response } from 'express';
import mongoose from 'mongoose';
import cors from 'cors';

import authRoutes from './routes/authRoutes';

dotenv.config();

// 2. Bikin instance Express
const app = express();

// 3. Pasang middleware
app.use(cors());
app.use(express.json());

// 4. Fungsi konek ke MongoDB
const connectDB = async (): Promise<void> => {
  try {
    await mongoose.connect(process.env.MONGODB_URI as string);
    console.log('MongoDB connected');
  } catch (error) {
    console.error((error as Error).message);
    process.exit(1);
  }
};
connectDB();

// 5. Route testing sederhana
app.get('/', (req: Request, res: Response) => {
  res.send('Server jalan');
});
app.use('/api/auth', authRoutes);
// 6. Jalanin server
const PORT: number = Number(process.env.PORT) || 3100;
app.listen(PORT, () => {
  console.log(`Server berjalan di port ${PORT}`);
});