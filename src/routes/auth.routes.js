import * as authController from '../controllers/auth.controller.js'
import { authMiddleware } from '../middleware/authMiddleware.js';
import { Router } from "express"
const router = Router();

router.post("/auth/signup", authController.signUp);
router.post("/auth/login", authController.logIn);

router.get("/me", authMiddleware, (req, res) => {
    res.json({ userId: req.userId, role: req.userRole });
});
export default router;
