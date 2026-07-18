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

user.pre('save', async function(next) {
    if(!this.isModified('password')) return next();
    try {
        this.password = await bcrypt.hash(this.password, 10);
        next();
    } catch (error) {
        next(error);
    }

})

export default mongoose.model("User", user);
