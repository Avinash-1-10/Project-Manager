import { Router } from "express";
import { login, logout } from "../controllers/authController.js";
import authMiddleware from "../middlewares/auth.js";

const router = Router();

router.post("/login", login);
router.post("/logout", authMiddleware, logout)



export default router