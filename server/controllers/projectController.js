import Member from "../models/memberModel.js";
import Project from "../models/ProjectModel.js";
import { CustomError } from "../utils/customError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";
import mongoose from "mongoose";

export const createProject = asyncHandler(async (req, res, next) => {
  const { name, description, startDate, dueDate, weeks } = req.body;

  // Validate required fields
  if (!name || !description || !startDate || !dueDate || !weeks) {
    return next(new CustomError("All fields are required", 400));
  }

  // Create a new project instance
  const project = new Project({
    owner: req.user._id,
    name,
    description,
    startDate,
    dueDate,
    weeks,
  });

  await project.save();
  return res
    .status(201)
    .json(new ApiResponse(201, "Project created successfully", project));
});

export const getProjects = asyncHandler(async (req, res, next) => {
  const projects = await Project.find();
  const total = await Project.countDocuments();
  return res
    .status(200)
    .json(
      new ApiResponse(200, "Projects fetched successfully", { projects, total })
    );
});

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

export const updateProject = async (req, res) => {
  try {
    const { name, description, startDate, dueDate } = req.body;
    const project = await Project.findById(req.params.id);
    if (!project) {
      return res.status(404).json(new ApiError(404, "Project not found"));
    }
    project.name = name;
    project.description = description;
    project.startDate = startDate;
    project.dueDate = dueDate;
    await project.save();
    return res
      .status(200)
      .json(new ApiResponse(200, "Project updated successfully", project));
  } catch (error) {
    return res.status(500).json(new ApiError(500, error.message));
  }
};

export const addMemberToProject = async (req, res) => {
  try {
    const { projectId } = req.params;
    const { memberId, role } = req.body;
    if (!memberId || !role) {
      return res.status(400).json(new ApiError(400, "memberId is required"));
    }
    const newMember = new Member({
      member: memberId,
      project: projectId,
      role,
    });
    await newMember.save();
    return res
      .status(200)
      .json(new ApiResponse(200, "Member added successfully", newMember));
  } catch (error) {
    return res.status(500).json(new ApiError(500, error.message));
  }
};

export const removeMemberFromProject = async (req, res) => {
  try {
    const { projectId, memberId } = req.params;
    const member = await Member.findOne({
      member: memberId,
      project: projectId,
    });
    if (!member) {
      return res.status(404).json(new ApiError(404, "Member not found"));
    }
    await member.remove();
    return res
      .status(200)
      .json(new ApiResponse(200, "Member removed successfully", member));
  } catch (error) {
    return res.status(500).json(new ApiError(500, error.message));
  }
};

export const deleteProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) {
      return res.status(404).json(new ApiError(404, "Project not found"));
    }
    await project.remove();
    return res
      .status(200)
      .json(new ApiResponse(200, "Project deleted successfully", project));
  } catch (error) {
    return res.status(500).json(new ApiError(500, error.message));
  }
};

// stats
export const getProjectsDeadlineStats = asyncHandler(async (req, res, next) => {
  const { userId } = req.params;

  const stats = await Project.aggregate([
    {
      $match: { owner: userId },
    },
    {
      $project: {
        name: 1,
        totalDays: {
          $round: [
            {
              $divide: [
                { $subtract: ["$dueDate", "$startDate"] },
                1000 * 60 * 60 * 24,
              ],
            },
            0,
          ],
        },
        remainingDays: {
          $round: [
            {
              $divide: [
                { $subtract: ["$dueDate", new Date()] },
                1000 * 60 * 60 * 24,
              ],
            },
            0,
          ],
        },
      },
    },
  ]);

  return res
    .status(200)
    .json(new ApiResponse(200, "Projects fetched successfully", stats));
});
