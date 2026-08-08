import * as otpService from '../services/registerOTP.service.js';

export const sendRegisterterOTP = async (req, res) => {
  try {
    const { ...data} = req.body;

    if (!data.email) {
      return res.status(400).json({ message: response.msg });
    }

    const response = await otpService.sendOtpService(data.email, data?.forgot);

 
    if (response.success) {
      return res.status(200).json({ message: response.msg });
    }

    return res.status(response.status).json({ message: response.msg });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: error.message });
  }
};

export const verifyOTP = async (req, res) => {
  try {
    const { email, otp } = req.body;
    const response = await otpService.getOTPByEmail(email, otp);

    if (response.status == 401 || response.status == 400) {
      return res.status(response.status).json({ message: response.msg });
    }

    return res.status(response.status).json({ message: response.msg, success: response.success });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: error.message });
  }
};

