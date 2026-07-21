import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import ConnectDb from './src/config/dbconfig.js'
import authRoutes from './src/routes/authRoutes/authRoutes.js';

dotenv.config()
const app=express();
const PORT = process.env.UB_PORT
const MongoDbUri= process.env.MONGODB_URI


app.use(express.json());

app.use(cors({
    origin: [
        "http://localhost:5173",
        "https://undobharat-git-developement-codedeffs-projects.vercel.app/",
        "https://undobharat.vercel.app/"
    ],
    credentials: true
}));
ConnectDb(MongoDbUri)



app.use("/api",authRoutes);

app.get('/',(req,res)=>{
    res.send("UndoBharat API Is Running..")
})


app.listen(PORT, ()=>{
console.log(`Undobharat Server Running In Port ${PORT}`);
});
