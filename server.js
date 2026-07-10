import express from 'express'
import cors from 'cors'
import authRoutes from './src/routes/authRoutes.js';

const app=express();
const PORT = 3000


app.use(express.json());

app.use(cors());




app.use("/api",authRoutes);



app.listen(PORT, ()=>{
console.log(`Undobharat Server Running In Port ${PORT}`);
});