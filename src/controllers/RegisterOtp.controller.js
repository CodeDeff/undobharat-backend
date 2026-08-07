import * as otpService from '../services/registerOTP.service.js';

export const sendRegisterterOTP = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }

    const response = await otpService.sendOtpService(email);
 
    if (response.success) {
      return res.status(200).json({ message: 'OTP sent successfully' });
    }

    return res.status(500).json({ message: 'Failed to send OTP' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: error.message });
  }
};

export const verifyOTP = async (req, res) => {
  try {
    const { email, otp } = req.body;
    const response = await otpService.getOTPByEmail(email, otp);
    if (response.status == 400) {
      return res.status(400).json({ message: response.msg });
    }

    return res.status(200).json({ message: "OTP Verified Sucessfully",success: response.success });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: error.message });
  }
};

