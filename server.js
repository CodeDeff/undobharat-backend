import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
dotenv.config()
import ConnectDb from './src/config/dbconfig.js'
import authRoutes from './src/routes/authRoutes.js';

const app=express();
const PORT = process.env.UB_PORT
const MongoDbUri= process.env.MONGODB_URL


app.use(express.json());

app.use(cors());
ConnectDb(MongoDbUri)



app.use("/api",authRoutes);



app.listen(PORT, ()=>{
console.log(`Undobharat Server Running In Port ${PORT}`);
});
