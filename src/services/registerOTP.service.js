import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import SibApiV3Sdk from 'sib-api-v3-sdk';
import bcrypt from 'bcryptjs';
import { createNewOTP, deleteOTPSign, findOTP } from '../repositorys/SignupOTP.repository.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, '../../../.env') });

// API_KEY and Sender Email
const smtp_apikey = process.env.BREVO_API_KEY;
const sender_email = process.env.EMAIL_USER;

// Brevo Client Config
const Brevoclient = SibApiV3Sdk.ApiClient.instance;
const apiKey = Brevoclient.authentications['api-key'];
apiKey.apiKey = smtp_apikey;

const tranEmailApi = new SibApiV3Sdk.TransactionalEmailsApi();
// random OTP generating
const generateOTP = () => {
  const otp = Math.floor(1000 + Math.random() * 9000).toString();
  return otp;
};
//sending otp to mail
const sendOtpToEmail = async (email, otp) => {
  try {
    const sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail();
    sendSmtpEmail.to = [{ email }];
    sendSmtpEmail.sender = { email: sender_email };
    sendSmtpEmail.subject = 'Welcome to Undobharat';
    sendSmtpEmail.htmlContent = `<html><body><p>Undobhara OTP for Registration: ${otp}</p><p>Best regards,<br/>Undobhara Team</p></body></html>`;

    await tranEmailApi.sendTransacEmail(sendSmtpEmail);

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

    await deleteOTPSign(email);

    const otp = generateOTP();
    console.log(otp);
    const hashedOTP = await bcrypt.hash(otp, 10);

    await createNewOTP(email, hashedOTP);
    await sendOtpToEmail(email, otp);

    return { success: true, status: 200 };
  } catch (error) {
    return { success: false, status: 500 };
  }
};

//finding otp by mail
const getOTPByEmail = async (email, otp) => {
  const res = await findOTP(email);
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

export { sendOtpService, getOTPByEmail };