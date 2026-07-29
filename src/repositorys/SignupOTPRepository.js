import signupOTP from '../models/SignupOTP.js'

export const createNewOTP = async (email, otp) => {
    try {
        const newOTP = new signupOTP({
            email,
            otp,
            createdAt: new Date(Date.now() + 5 * 60 * 1000)
        });
        return await newOTP.save();
    }
    catch (error) {
        throw error;
    }
}

export const deleteOTPSign = async (email) => {
    try {
        await signupOTP.deleteMany({ email })
    }
    catch (error) {
        throw error;
    }
}

export const findOTP= async(email)=>{
    try {
        return signupOTP.findOne({email},{otp:1, _id:0})
    } catch (error) {
        throw error;
    }
}