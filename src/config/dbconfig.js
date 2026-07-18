import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();


const ConnectDb = async () => {
    try{
        await mongoose.connect(process.env.MONGODB_URL);
        console.log("MongoDB connected Succesfully✅");
    }catch(error){
       console.error("Error while Connecting MongoDB");
    }
}

export default ConnectDb;
