import mongoose from "mongoose";


const signupOTP=new mongoose.Schema({

    email:{
        type:String,
        required:true
    },
    otp:{
        type:String,
        required:true
    },
    createdAt:{
        type:Date,
        default: new Date(Date.now() + 5 * 60 * 1000)
    }

})

export default mongoose.model("SignupOTP", signupOTP);