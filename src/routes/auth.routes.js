import * as authController from '../controllers/auth.controller.js'
import { authMiddleware } from '../middleware/authMiddleware.js';
import { Router } from "express"
const router = Router();

router.post("/auth/signup", authController.signUp);
router.post("/auth/login", authController.logIn);
router.get("/auth/me", authMiddleware, authController.authentication);
router.put("/auth/update-password", authController.UpdateUserPassword);
router.post("/auth/logout", authController.logOut);
router.get('/user/me',authMiddleware,authController.getUserDetails);

export default router;
