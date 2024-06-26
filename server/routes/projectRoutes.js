import { Router } from "express";
import {
  createProject,
  getProjects,
  getProjectsDeadlineStats,
} from "../controllers/projectController.js";
import authMiddleware from "../middlewares/auth.js";

const router = Router();

router.post("/", authMiddleware, createProject);
router.get("/", authMiddleware, getProjects);
router.get("/stats/deadline", authMiddleware, getProjectsDeadlineStats);

export default router;
