import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import addWeeks from "date-fns/addWeeks";
import axios from "axios";
import Loader from "./Loader";
import useToast from "../hooks/useToast";
import ToastContainer from "./ToastContainer";
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const projectSchema = yup.object().shape({
  name: yup.string().required("Project name is required"),
  description: yup.string().required("Description is required"),
  weeks: yup
    .number()
    .min(1, "Minimum 1 week is required")
    .max(10, "Maximum 10 weeks are allowed")
    .required("Number of weeks is required"),
  startDate: yup.date().required("Start date is required"),
});

const ProjectCreateForm = () => {
  const { toasts, addToast, removeToast } = useToast();
  const [dueDate, setDueDate] = useState(null);
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    watch,
  } = useForm({
    resolver: yupResolver(projectSchema),
  });

  const onSubmit = async (data) => {
    setLoading(true);

    try {
      const calculatedDueDate = addWeeks(new Date(data.startDate), data.weeks);
      const finalData = { ...data, dueDate: calculatedDueDate };
      console.log(finalData);
      const response = await axios.post(`${BACKEND_URL}/projects`, finalData);
      addToast(response.data.message, "success");
    } catch (error) {
      console.error("Error creating project:", error);
      if (error.response.status === 401) {
        navigate("/login");
      }
      addToast(error.response.data.message, "error");
    } finally {
      setLoading(false);
    }
  };

  const weeks = watch("weeks");
  const startDate = watch("startDate");

  React.useEffect(() => {
    if (startDate && weeks) {
      const calculatedDueDate = addWeeks(new Date(startDate), weeks);
      setDueDate(calculatedDueDate.toISOString().split("T")[0]);
    }
  }, [startDate, weeks]);

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="w-full">
        <div className="form-control">
          <label className="label">
            <span className="label-text">Project Name</span>
          </label>
          <input
            {...register("name")}
            type="text"
            placeholder="Project Name"
            className="input input-bordered w-full"
          />
          {errors.name && <p className="text-error">{errors.name.message}</p>}
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Description</span>
          </label>
          <textarea
            {...register("description")}
            className="textarea textarea-bordered w-full"
            placeholder="Project Description"
          ></textarea>
          {errors.description && (
            <p className="text-error">{errors.description.message}</p>
          )}
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Number of Weeks</span>
          </label>
          <select
            {...register("weeks")}
            className="select select-bordered w-full"
          >
            <option value="">Select Weeks</option>
            {[...Array(10).keys()].map((i) => (
              <option key={i + 1} value={i + 1}>
                {i + 1} week{i + 1 > 1 && "s"}
              </option>
            ))}
          </select>
          {errors.weeks && <p className="text-error">{errors.weeks.message}</p>}
        </div>
        {weeks && (
          <div className="form-control">
            <label className="label">
              <span className="label-text">Start Date</span>
            </label>
            <input
              {...register("startDate")}
              type="date"
              className="input input-bordered w-full"
            />
            {errors.startDate && (
              <p className="text-error">{errors.startDate.message}</p>
            )}
          </div>
        )}
        {dueDate && (
          <div className="form-control">
            <label className="label">
              <span className="label-text">Due Date</span>
            </label>
            <input
              type="date"
              value={dueDate}
              readOnly
              className="input input-bordered w-full"
            />
          </div>
        )}
        <div className="form-control mt-4">
          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? <Loader /> : "Create Project"}
          </button>
        </div>
      </form>
      <ToastContainer toasts={toasts} removeToast={removeToast} />
    </>
  );
};

export default ProjectCreateForm;
