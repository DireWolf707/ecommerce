import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db.js';

dotenv.config()
connectDB();

const app = express();
app.use(cors());

app.get("/",(req,res,next) => {
    res.send('okay')
})


const PORT = process.env.PORT || 8000
app.listen(PORT, () => {
    console.log("server running on port :",PORT);
})