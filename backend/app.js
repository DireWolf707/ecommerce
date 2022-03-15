import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import productRoutes from './routes/productRoutes.js';
import userRoutes from './routes/userRoutes.js';
// env
dotenv.config()
// db
connectDB();
// app init
const app = express();
// middlewares
app.use(morgan('dev'));
app.use(cors());
app.use(express.json())
// routes
app.use('/api/products', productRoutes);
app.use('/user', userRoutes);
// invalid routes
app.all('*',(req,res,next) => {
    next(new Error(`${req.originalUrl} not found!`));
})
// global error handler
app.use((err,req,res,next) => {
    res.json({
        message: err.message
    })
})

const PORT = process.env.PORT || 8000
app.listen(PORT, () => {
    console.log("server running on port :",PORT);
})