import * as authServices from '../services/auth.service.js'

// User Register or Signup

export const signUp = async (req, res) => {
  try {
    const user = await authServices.registerUser(req.body);
    res.status(201).json({
      message: "User Registered Successfully",
      userId: user._id
    })
  } catch (error) {
    console.log("Error:", error)
    res.status(500).json({ message: error.message });


  }
}
// User Login

export const logIn = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await authServices.loginUser(email, password);

    const isProduction = process.env.NODE_ENV === "production";

    res.cookie("jwt", user.token, {
      httpOnly: true,
      secure: isProduction,
      sameSite: isProduction ? "none" : "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.status(200).json(
      {
        message: "User login successfully",
        data: user
      });
  } catch (error) {

    if (error.message === "Invalid email or password") {
      return res.status(401).json({ message: error.message });
    }
    res.status(500).json({
      message: "Internal server error"
    });
  }
}
