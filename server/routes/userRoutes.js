import { Router } from "express";
import {
  createUser,
  getUserById,
  getUserByQuery,
  getUsers,
} from "../controllers/userController.js";

const router = Router();

// create user
router.post("/", createUser);
// get all users
router.get("/", getUsers);
// get user by id
router.get("/:id", getUserById);
// get user by query
router.get("/query", getUserByQuery);

export default router;
