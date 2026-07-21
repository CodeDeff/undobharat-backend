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
const allowedOrigins = [
  "http://localhost:5173",
  "https://undobharat-git-developement-codedeffs-projects.vercel.app",
  "https://undobharat.vercel.app"
];

app.use(
  cors({
    origin(origin, callback) {
      // Allow requests with no origin (Postman, server-to-server)
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      return callback(new Error("Not allowed by CORS"));
    },
    credentials: true,
  })
)


ConnectDb(MongoDbUri)



app.use("/api",authRoutes);

app.get('/',(req,res)=>{
    res.send("UndoBharat API Is Running..")
})


app.listen(PORT, ()=>{
console.log(`Undobharat Server Running In Port ${PORT}`);
});
