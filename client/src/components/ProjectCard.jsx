import React from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const ProjectCard = ({ project }) => {
  const { name, startDate, dueDate } = project;

  const calculateRemainingDays = (dueDate) => {
    const due = new Date(dueDate);
    const now = new Date();
    const diffTime = Math.abs(due - now);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const remainingDays = calculateRemainingDays(dueDate);

  const data = {
    datasets: [
      {
        data: [remainingDays, 100 - remainingDays],
        backgroundColor: ["#E0E0E0", "#4CAF50"],
        hoverBackgroundColor: ["#D5D5D5", "#45A049"],
      },
    ],
  };

  const formatDate = (dateString) => {
    const options = { day: "numeric", month: "short" };
    return new Date(dateString).toLocaleDateString("en-US", options);
  };

  return (
    <div className="card shadow-lg compact side bg-base-100 w-80 m-4 border border-gray-600 hover:border-primary transition-all duration-300 hover:scale-105 cursor-pointer">
      <div className="flex justify-between p-4">
        <h2 className="card-title mt-[-30px]">{name}</h2>
        <div className="flex flex-col space-y-2">
          <button className="btn btn-sm btn-ghost">
            <FaEdit className="text-primary" />
          </button>
          <button className="btn btn-sm btn-ghost">
            <FaTrash className="text-error" />
          </button>
        </div>
      </div>
      <div className="pb-4 px-4 flex justify-between">
        <div className="flex flex-col items-center">
          <p>Start-Due</p>
          <div className="flex items-center gap-1">
            <p>{formatDate(startDate)}</p>
            <p>-</p>
            <p> {formatDate(dueDate)}</p>
          </div>
        </div>
        <div className="flex flex-col items-center">
          <p>Remaining Days</p>
          <p>{remainingDays}</p>
        </div>
      </div>
      <div className="flex justify-center pb-4 px-4">
        <div className="w-32 h-32">
          <Doughnut
            data={data}
            options={{ cutout: "80%", plugins: { legend: { display: false } } }}
          />
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
