import * as authController from '../controllers/authController.js'
import {Router} from "express"
const router=Router();

router.post("/auth/signup",authController.signUp);
router.post("/auth/login", authController.logIn);
export default router;
