import mongoose from "mongoose";

const memberSchema = new mongoose.Schema(
  {
    member: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    project: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Project",
      required: true,
    },
    role: {
      type: String,
    },
  },
  { timestamps: true }
);

const Member = mongoose.model("Member", memberSchema);
export default Member;
