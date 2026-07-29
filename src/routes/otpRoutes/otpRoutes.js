import * as otps from '../../controllers/otpController/RegisterOtp.js'
import { Router } from "express"
const router = Router();


router.post("/auth/send-otp", otps.sendRegisterterOTP)
router.get("/auth/verify-otp", otps.verifyOTP)

export default router;