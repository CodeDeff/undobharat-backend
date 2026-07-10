import * as authServices from '../services/authService.js'

export const login=async(req,res,next)=>{

    try {
        const response= await authServices.login(req.body);

        console.log("Response:", response )

        res.status(200).json({
            success: true,
            response
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        })
    }

}