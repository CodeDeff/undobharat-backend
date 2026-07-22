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
 
app.set("trust proxy", 1);
app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true); // allow Postman, curl
      if (allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    exposedHeaders: ['Content-Range', 'X-Content-Range']
  })
);

 


ConnectDb(MongoDbUri)



app.use("/api",authRoutes);

app.get('/',(req,res)=>{
    res.send("UndoBharat API Is Running..")
})


app.listen(PORT, ()=>{
console.log(`Undobharat Server Running In Port ${PORT}`);
});
