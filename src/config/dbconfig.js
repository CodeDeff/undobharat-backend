import mongoose from 'mongoose';


const ConnectDb = async (MONGODB_URI) => {
    try{
        await mongoose.connect(MONGODB_URI);
        console.log("MongoDB connected Succesfully✅");
    }catch(error){
       console.error("Error while Connecting MongoDB:", error);
    }
}

export default ConnectDb;
