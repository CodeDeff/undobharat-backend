import user from "../models/User.js";
import jwt from 'jsonwebtoken';

// Sign up user
export const registerUser = async (userData) =>{
    const {fullname, email, password} = userData;

    const existingUser = await user.findOne({email});
    if (existingUser){
        throw new Error("User already exists");
    }

    const newUser = new user({
        fullname,
        email,
        password: password
    })
    return await newUser.save()
}
    // Login User
export const loginUser = async(email, password) => {

    //console.log("email receiving:", email);
    const userRecord = await user.findOne({email});

    // Check if user exists

    if (!userRecord){
        throw new Error("Invalid email or password");
    }

    // Compared password
    //console.log("password from req:", password);
    //console.log("password from DB:", userRecord.password);
    const isMatch = await bcrypt.compare(password, userRecord.password);

    if(!isMatch){
        throw new Error("Invalid email or password")
    }
    // Generate JWT Token
    const token = jwt.sign({id: userRecord._id}, process.env.JWT_SECRET, {expiresIn:'1h'});
    return {token, userId: userRecord._id}
}
