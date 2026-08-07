import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import bcrypt from 'bcryptjs';
import { createNewOTP, deleteOTPSign, findOTP } from '../repositorys/SignupOTP.repository.js';
import getBrevoClient from '../config/brevo.config.js'

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, '../../.env') });

// random OTP generating
const generateOTP = () => {
  const otp = Math.floor(1000 + Math.random() * 9000).toString();
  return otp;
};

//sending otp to mail
const sendOtpToEmail = async (email, otp) => {
  try {
    const brevo = getBrevoClient();
    const sender_email = process.env.EMAIL_USER;


    await brevo.transactionalEmails.sendTransacEmail({
      subject: 'Welcome to Undobharat',
      sender: { email: sender_email },
      to: [{ email }],
      htmlContent: `<html><body><p>Undobharat OTP for Registration: ${otp}</p><p>Best regards,<br/>Undobharat Team</p></body></html>`
    });

    return true;
  } catch (error) {
    throw error;
  }
};
// Main Code
const sendOtpService = async (email) => {
  try {
    if (!email) {
      throw new Error('Enter email Id');
    }

    const otp = generateOTP();
    console.log(otp);
    const hashedOTP = await bcrypt.hash(otp, 10);

    await createNewOTP(email, hashedOTP);
    await sendOtpToEmail(email, otp);

    return { success: true, status: 200 };
  } catch (error) {
    console.log(error)
    return { success: false, status: 500 };
  }
};

//finding otp by mail
const getOTPByEmail = async (email, otp) => {
  const res = await findOTP(email);

  if (!res || !res.otp) {
    return { msg: "OTP not found or expired", success: false, status: 400 };
  }

  if(res && res.expiresAt < new Date()) {
    await deleteOTPSign(email);
    return { msg: "OTP has expired", success: false, status: 400 };
  }

  const ismatch = await verifyOtp(otp, res.otp);
  if (ismatch) return { msg: "OTP Verified", success: true, status: 200 }
  else return { msg: "OTP is not Matching", success: false, status: 400 }
};

const verifyOtp = async (originalotp, dbotp) => {
  try {
    return await bcrypt.compare(originalotp, dbotp);
  } catch (error) {
    throw error;
  }
}

export { sendOtpService, getOTPByEmail, deleteOTPSign };