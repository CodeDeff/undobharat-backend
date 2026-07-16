import * as authController from '../controllers/authController.js'
import {Router} from "express"
const router=Router();

router.post("/auth/login",authController.login);
export default router;
