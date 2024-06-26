import mongoose from "mongoose";

const projectSchema = new mongoose.Schema(
  {
    owner:{
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Project owner is required"],
    },
    name: {
      type: String,
      required: [true, "Project name is required"],
      trim: true,
      maxlength: [100, "Project name cannot exceed 100 characters"],
    },
    description: {
      type: String,
      required: [true, "Project description is required"],
      trim: true,
      maxlength: [500, "Project description cannot exceed 500 characters"],
    },
    startDate: {
      type: Date,
      required: [true, "Start date is required"],
      validate: {
        validator: (v) => v >= new Date(),
        message: "Start date must be today or later",
      },
    },
    dueDate: {
      type: Date,
      required: [true, "Due date is required"],
      validate: {
        validator: function (v) {
          return v > this.startDate;
        },
        message: "Due date must be after the start date",
      },
    },
    weeks: {
      type: Number,
      required: [true, "Number of weeks is required"],
      min: [1, "Project must last at least one week"],
    },
  },
  { timestamps: true }
);

// Example of an instance method
projectSchema.methods.calculateDuration = function () {
  const duration = (this.dueDate - this.startDate) / (1000 * 60 * 60 * 24 * 7);
  return duration;
};

// Example of a static method
projectSchema.statics.findByDateRange = function (start, end) {
  return this.find({
    startDate: { $gte: start },
    dueDate: { $lte: end },
  });
};

const Project = mongoose.model("Project", projectSchema);
export default Project;
