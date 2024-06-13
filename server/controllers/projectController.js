import Project from "../models/ProjectModel";
import { ApiError } from "../utils/ApiError";
import { ApiResponse } from "../utils/ApiResponse";

export const createProject = async (req, res) => {
  try {
    const { name, description, startDate, dueDate } = req.body;
    if (!name || !startDate || !dueDate) {
      return res.status(400).json(new ApiError(400, "All fields are required"));
    }
    const project = new Project(name, description, startDate, dueDate);
    await project.save();
    return res
      .status(200)
      .json(new ApiResponse(200, "Project created successfully", project));
  } catch (error) {
    return res.status(500).json(new ApiError(500, error.message));
  }
};

export const getProjectById = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) {
      return res.status(404).json(new ApiError(404, "Project not found"));
    }
    return res
      .status(200)
      .json(new ApiResponse(200, "Project fetched successfully", project));
  } catch (error) {
    return res.status(500).json(new ApiError(500, error.message));
  }
};
