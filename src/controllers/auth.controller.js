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
    console.log(error)
    if (error.message === "Invalid email or password") {
      return res.status(401).json({ message: "Invalid email or password" });
    }
    else if (error.message === "User Not Found") {
      return res.status(404).json({ message: "User Not Found" });
    }
    res.status(500).json({
      message: "Internal server error"
    });
  }
}

export const authentication = async (req, res) => {
  try {
    // console.log(req)
    const user = await authServices.authentication(req.userId, req.userRole, req.userEmail);
    res.status(200).json({
      message: "User authenticated successfully",
      data: user
    })
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message })
  }
}
export const UpdateUserPassword = async (req, res) => {
  try {
    const { email, newPassword } = req.body;
    const user = await authServices.UpdatePassword(email, newPassword);
    res.status(200).json({ message: "Password Updated Successfully", user });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: error.message });
  }
}

export const logOut = async (req, res) => {
  try {
    await authServices.logout(req, res);

    res.status(200).json({
      message: "User logged out successfully"
    })

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message })
  }
}

