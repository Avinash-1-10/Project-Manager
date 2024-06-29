import Member from "../models/memberModel";
import asyncHandler from "../utils/asyncHandler";

const getProjectMembers = asyncHandler(async (req, res, next) => {
  const { projectId } = req.params;

  const members = await Member.find({ project: projectId });

  return res
    .status(200)
    .json(new ApiResponse(200, "Members fetched successfully", members));
});
