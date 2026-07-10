import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
dotenv.config()
import authRoutes from './src/routes/authRoutes.js';

const app=express();
const PORT = process.env.UB_PORT


app.use(express.json());

app.use(cors());




app.use("/api",authRoutes);



app.listen(PORT, ()=>{
console.log(`Undobharat Server Running In Port ${PORT}`);
});