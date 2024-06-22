import { Router } from "express";
import { createProject } from "../controllers/projectController.js";
import authMiddleware from "../middlewares/auth.js";

const router = Router();

router.post("/", createProject);


export default router;