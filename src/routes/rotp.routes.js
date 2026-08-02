import * as otps from '../controllers/RegisterOtp.controller.js'
import { Router } from "express"
const router = Router();


router.post("/auth/send-otp", otps.sendRegisterterOTP)
router.post("/auth/verify-otp", otps.verifyOTP)

export default router;