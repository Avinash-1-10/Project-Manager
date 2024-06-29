import Member from "../models/memberModel.js";
import User from "../models/userModel.js";
import asyncHandler from "../utils/asyncHandler.js";

export const getProjectMembers = asyncHandler(async (req, res, next) => {
  const { projectId } = req.params;

  const members = await Member.find({ project: projectId });

  return res
    .status(200)
    .json(new ApiResponse(200, "Members fetched successfully", members));
});

export const getAllMembers = asyncHandler(async (req, res, next) => {
  const members = await Member.find();
  return res
    .status(200)
    .json(new ApiResponse(200, "Members fetched successfully", members));
});

export const getMemberById = asyncHandler(async (req, res, next) => {
  const member = await Member.findById(req.params.id);
  if (!member) {
    return next(new CustomError("Member not found", 404));
  }
  return res
    .status(200)
    .json(new ApiResponse(200, "Member fetched successfully", member));
});


export const getMemberProjects = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    return next(new CustomError("User not found", 404));
  }

  const memberProjects = await Member.find({ user: user._id });
  if (!memberProjects) {
    return next(new CustomError("Member not found", 404));
  }
  return res
    .status(200)
    .json(new ApiResponse(200, "Member projects fetched successfully", memberProjects));
});

