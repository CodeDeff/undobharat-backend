import path from 'path';
import { fileURLToPath } from 'url';
import jwt from 'jsonwebtoken';
import bcrypt from "bcryptjs";
import dotenv from 'dotenv'
import * as authRepo from '../repositorys/auth.repository.js'

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, '../../../.env') });

// Sign up user
export const registerUser = async (userData) => {
    try {
        const userRecord = await authRepo.createNewUser(userData)
        const { password, ...newUserData } = userRecord.toObject();
        return newUserData
    } catch (error) {
        throw error;
    }
}
// Login User
export const loginUser = async (email, password) => {


    const userRecord = await authRepo.findUserByEmail(email)
    // Check if user exists
    if (!userRecord) {
        throw new Error("User Not Found");
    }


    const isMatch = await bcrypt.compare(password, userRecord.password);

    if (!isMatch) {
        throw new Error("Invalid email or password")
    }
    // Generate JWT Token
    const token = jwt.sign({ id: userRecord._id, role: userRecord.role,email: userRecord.email }, process.env.JWT_SECRET, { expiresIn: '1h' });

    return { token, userId: userRecord._id, role: userRecord.role, email: userRecord.email };
}

export const logout = async (req, res) => {
    try {
          const isProduction = process.env.NODE_ENV === "production";

        res.clearCookie("jwt", {
        httpOnly: true,
        secure: isProduction,
        sameSite: isProduction ? "none" : "lax",
        });
    } catch (error) {
        throw Error(error.message)
    }


}

export const UpdatePassword = async (email, password) => {
    try {
        return await authRepo.UpdatePassword(email, password);
    } catch (err) {
        throw err;
    }
}

export const authentication = async (userId, userRole, userEmail) => {
    return { userId: userId, role: userRole, email: userEmail };
}

export const getUserDetailsByEmail=async(email)=>{
    try {
         const user= await authRepo.findUserByEmail(email);
        if(!user){
            throw new Error("User Not Found");
        }
        const { password, ...userWithoutPassword } = user.toObject();
        return {status:200, user:userWithoutPassword};
    } catch (error) {
        throw error;
    }
}