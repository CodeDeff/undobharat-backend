import * as otpService from '../../services/otpServices/RegisterOTPService.js';

export const sendRegisterterOTP = async (req, res) => {
  try {
    const { email } = req.body;
    const response = await otpService.sendOtpService(email);

    if (response) {
      return res.status(200).json({ message: 'OTP sent successfully' });
    }

    return res.status(500).json({ message: 'Internal server error' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: error.message });
  }
};

export const verifyOTP = async (req, res) => {
  try {
    const {email,otp}=req.body;
     const response = await otpService.getOTPByEmail(email, otp);

    if (!response) {
      return res.status(404).json({ message: 'OTP not found' });
    }

    return res.status(200).json({ message: "OTP Verified Sucessfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: error.message });
  }
};