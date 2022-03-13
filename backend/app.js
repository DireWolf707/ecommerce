import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import productRoutes from './routes/productRoutes.js';

dotenv.config()
connectDB();

const app = express();
app.use(morgan('dev'));
app.use(cors());

app.use('/api/products', productRoutes);

const PORT = process.env.PORT || 8000
app.listen(PORT, () => {
    console.log("server running on port :",PORT);
})