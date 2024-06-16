import Member from "../models/memberModel";
import Project from "../models/ProjectModel";
import { ApiError } from "../utils/customError";
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
    const {projectId} = req.params;
    const {memberId, role} = req.body;
    if(!memberId || !role) {
      return res.status(400).json(new ApiError(400, "memberId is required"));
    }
    const newMember = new Member({
      member: memberId,
      project: projectId,
      role
    })
    await newMember.save();
    return res
      .status(200)
      .json(new ApiResponse(200, "Member added successfully", newMember));
  } catch (error) {
    return res.status(500).json(new ApiError(500, error.message));
  }
}

export const removeMemberFromProject = async (req, res) => {
  try {
    const {projectId, memberId} = req.params;
    const member = await Member.findOne({member: memberId, project: projectId});
    if(!member) {
      return res.status(404).json(new ApiError(404, "Member not found"));
    }
    await member.remove();
    return res
      .status(200)
      .json(new ApiResponse(200, "Member removed successfully", member));
  } catch (error) {
    return res.status(500).json(new ApiError(500, error.message));
  }
}

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
