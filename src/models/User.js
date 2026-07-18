import mongoose from 'mongoose';
import bcrypt, { hash } from 'bcryptjs';

const user= mongoose.Schema({
    fullname:{
        type:String,
        required:true,

    },
    email:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true
    },
    role:{
        type:String,
        default:"user",
        required:true
    }


});



export default mongoose.model("User", user);
