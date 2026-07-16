// auth.service.js
import user from '../models/User.js'
export const login = async (data) => {

    // const user = await User.findOne({ email: data.email });

    // if (!user)
    //     throw new Error("User not found");

    // const isMatch = await bcrypt.compare(data.password, user.password);

    // if (!isMatch)
    //     throw new Error("Invalid password");

    // const token = jwt.sign(
    //     { id: user._id },
    //     process.env.JWT_SECRET
    // );

    // return {
    //     success: true,
    //     token
    // };
    console.log(data)

    return data;
};