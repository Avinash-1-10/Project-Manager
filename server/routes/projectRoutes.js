import { Router } from "express";
import {
  createProject,
  getProjectById,
  getProjects,
  getProjectsDeadlineStats,
  getUserProjectDetails,
  updateProject,
} from "../controllers/projectController.js";
import authMiddleware from "../middlewares/auth.js";

const router = Router();

router.post("/", authMiddleware, createProject);
router.get("/", authMiddleware, getProjects);
router.get("/:id", authMiddleware, getProjectById)
router.put("/:id", authMiddleware, updateProject);
router.get("/stats/deadline", authMiddleware, getProjectsDeadlineStats);
router.get("/stats/details", authMiddleware, getUserProjectDetails);

export default router;
