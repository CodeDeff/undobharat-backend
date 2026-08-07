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
        default: Date.now
    },
    expiresAt:{
        type:Date,
        default: () => new Date(Date.now() + 3 * 60 * 1000),
        expires: 0
    }

})

export default mongoose.model("SignupOTP.model", signupOTP);