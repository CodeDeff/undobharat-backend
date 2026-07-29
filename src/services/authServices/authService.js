import path from 'path';
import { fileURLToPath } from 'url';
import user from "../../models/User.js";
import jwt from 'jsonwebtoken';
import bcrypt from "bcryptjs";
import dotenv from 'dotenv'

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, '../../../.env') });

// Sign up user
export const registerUser = async (userData) =>{
    const {fullname, email, password} = userData;

    const existingUser = await user.findOne({email});
    if (existingUser){
        throw new Error("User already exists");
     }
    const hashedPassword= await bcrypt.hash(password,10);
    const newUser = new user({
        fullname,
        email,
        password: hashedPassword
    })
    return await newUser.save()
}
    // Login User
export const loginUser = async(email, password) => {

    
    const userRecord = await user.findOne({email});

    // Check if user exists

    if (!userRecord){
        throw new Error("Invalid email or password");
    }

 
    const isMatch = await bcrypt.compare(password, userRecord.password);

    if(!isMatch){
        throw new Error("Invalid email or password")
    }
    // Generate JWT Token
    const token = jwt.sign({id: userRecord._id,role:userRecord.role}, process.env.JWT_SECRET, {expiresIn:'1h'});

    return {token, userId: userRecord._id,role:userRecord.role};
}
