import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import contactRoutes from './routes/contact.js';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use('/api/contact', contactRoutes);
app.get('/api/health', (req, res) => res.json({ success: true, message: 'API is running' }));

connectDB();

app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});
