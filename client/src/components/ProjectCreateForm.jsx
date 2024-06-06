import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import addWeeks from 'date-fns/addWeeks';

const projectSchema = yup.object().shape({
  name: yup.string().required("Project name is required"),
  description: yup.string().required("Description is required"),
  weeks: yup.number().min(1).max(10).required("Number of weeks is required"),
  startDate: yup.date().required("Start date is required"),
  client: yup.string(),
});

const ProjectCreateForm = () => {
  const [dueDate, setDueDate] = useState(null);
  const { register, handleSubmit, control, formState: { errors }, watch } = useForm({
    resolver: yupResolver(projectSchema),
  });

  const onSubmit = (data) => {
    const calculatedDueDate = addWeeks(new Date(data.startDate), data.weeks);
    const finalData = { ...data, dueDate: calculatedDueDate };
    console.log(finalData);
    // Send finalData to server or perform other actions
  };

  const weeks = watch("weeks");
  const startDate = watch("startDate");

  React.useEffect(() => {
    if (startDate && weeks) {
      const calculatedDueDate = addWeeks(new Date(startDate), weeks);
      setDueDate(calculatedDueDate.toISOString().split('T')[0]);
    }
  }, [startDate, weeks]);

  return (
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
        {errors.description && <p className="text-error">{errors.description.message}</p>}
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
          {[...Array(10).keys()].map(i => (
            <option key={i + 1} value={i + 1}>{i + 1} week{ i + 1 > 1 && "s"}</option>
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
          {errors.startDate && <p className="text-error">{errors.startDate.message}</p>}
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
      <div className="form-control">
        <label className="label">
          <span className="label-text">Client</span>
        </label>
        <input
          {...register("client")}
          type="text"
          placeholder="Client Name (Optional)"
          className="input input-bordered w-full"
        />
      </div>
      <div className="form-control mt-4">
        <button type="submit" className="btn btn-primary">
          Create Project
        </button>
      </div>
    </form>
  );
};

export default ProjectCreateForm;
