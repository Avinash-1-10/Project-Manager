import Member from "../models/memberModel.js";
import Project from "../models/ProjectModel.js";
import { CustomError } from "../utils/customError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";

export const createProject = asyncHandler(async (req, res, next) => {
  const { name, description, startDate, dueDate, weeks } = req.body;

  // count the number of projects created by the user
  const count = await Project.countDocuments({ owner: req.user._id });
  if (count >= 3) {
    return next(
      new CustomError("You have reached the maximum number of projects", 400)
    );
  }

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
    await Project.findByIdAndDelete(req.params.id);
    await Member.deleteMany({ project: req.params.id });
    return res
      .status(200)
      .json(new ApiResponse(200, "Project deleted successfully", project));
  } catch (error) {
    return res.status(500).json(new ApiError(500, error.message));
  }
};

// stats
export const getProjectsDeadlineStats = asyncHandler(async (req, res, next) => {
  const userId = req.user._id;

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


export const getUserProjectDetails = asyncHandler(async (req, res, next) => {
  const userId = req.user._id;

    // Find projects owned by the user
    const projects = await Project.find({ owner: userId }).populate("owner");

    const projectDetails = await Promise.all(
      projects.map(async (project) => {
        const members = await Member.find({ project: project._id }).populate("member");
        const totalDays = Math.ceil((project.dueDate - project.startDate) / (1000 * 60 * 60 * 24));
        const remainingDays = Math.ceil((project.dueDate - new Date()) / (1000 * 60 * 60 * 24));

        return {
          name: project.name,
          startDate: project.startDate,
          dueDate: project.dueDate,
          totalDays,
          remainingDays,
          numberOfMembers: members.length,
          members: members.map((m) => ({ memberId: m.member._id, memberName: `${m.member.firstName} ${m.member.lastName}`, role: m.role })),
          description: project.description,
        };
      })
    );

    return res.status(200).json(new ApiResponse(200, "Projects fetched successfully", projectDetails));
})
