import * as authServices from '../services/authService.js'

// User Register or Signup

export const signUp = async (req, res) => {
    try{
        const user = await authServices.registerUser(req.body);
        console.log(user);
        res.status(201).json({
        message: "User Registered Successfully!",
        userId: user._id
    })
    } catch(error){
      if(error.message === "User Registered Successfully"){
        return res.status(400).json({message: error.message})
        }
      console.error(error);
      res.status(500).json({message: 'Internal server error'});


    }
}
  // User Login

export const logIn = async (req, res) => {
  try {
    //console.log("Body from Postman:", req.body);
    const {email, password} = req.body;

    const user = await authServices.loginUser(email, password);

    console.log("controller Receiving:", user);

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
