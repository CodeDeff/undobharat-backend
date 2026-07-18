import * as authServices from '../../services/authServices/authService.js'

// User Register or Signup

export const signUp = async (req, res) => {
    try{
        const user = await authServices.registerUser(req.body);
         res.status(201).json({
        message: "User Registered Successfully!123",
        userId: user._id
    })
    } catch(error){
      console.error(error.message);
      res.status(500).json({message:error.message});


    }
}
  // User Login

export const logIn = async (req, res) => {
  try {
    const {email, password} = req.body;

    const user = await authServices.loginUser(email, password);

 
    res.status(200).json(
      {
      message: "User login successfully",
      data: user
      });
  } catch (error) {
    console.error(error);

    if(error.message === "Invalid email or password") {
      return res.status(401).json({ message: error.message });
    }
    res.status(500).json({
      message: "Internal server error"
    });
  }
}
