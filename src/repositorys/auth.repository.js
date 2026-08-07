import user from '../models/User.model.js'
import bcrypt from 'bcryptjs';

export const createNewUser = async (userData) => {
    try {
        const { fullname, email, password } = userData;
        const userRecord = await findUserByEmail(email);
        if (userRecord) throw new Error("User already exist");
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new user({
            fullname,
            email,
            password: hashedPassword
        })
        return await newUser.save()
    } catch (err) {
        throw err
    }
}

export const findUserByEmail = async (email) => {
    try {
        return await user.findOne({ email }).select("+password");
    } catch (error) {
        throw error;
    }
}

export const UpdatePassword = async (email, password) => {
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const updatedUser = await user.findOneAndUpdate(
            { email },
            { $set: { password: hashedPassword } },
            { new: true }
        );
        if (!updatedUser) throw new Error("User Not Found");
        return updatedUser;
    } catch (err) {
        throw err;
    }
}

