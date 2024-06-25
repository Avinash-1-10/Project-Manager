import { Router } from "express";
import { createProject, getProjects } from "../controllers/projectController.js";
import authMiddleware from "../middlewares/auth.js";

const router = Router();

router.post("/", createProject);
router.get("/", authMiddleware, getProjects);


export default router;