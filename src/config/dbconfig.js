import mongoose from 'mongoose';



const ConnectDb = async(MONGO_URI)=>{
    
    try{
        await mongoose.connect(MONGO_URI);
        console.log("MongoDB connected Succesfully✅");
    }catch(error){
       console.log("Error while Connecting MongoDB");

    }
}

export default ConnectDb;