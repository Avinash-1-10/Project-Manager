import React from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Link } from "react-router-dom";
import Modal from "./Modal";
import useModal from "../hooks/useModal";

ChartJS.register(ArcElement, Tooltip, Legend);

const ProjectCard = ({ project }) => {
  const { name, startDate, dueDate, totalDays, remainingDays } = project;
  const { isVisible, showModal, hideModal } = useModal();

  // Calculate remaining days ensuring it doesn't exceed total days
  const validRemainingDays =
    remainingDays > totalDays ? totalDays : remainingDays;

  // Calculate percentage of remaining days
  const remainingPercentage = (validRemainingDays / totalDays) * 100;

  const data = {
    datasets: [
      {
        data: [remainingPercentage, 100 - remainingPercentage],
        backgroundColor: ["#4CAF50", "#E0E0E0"],
        hoverBackgroundColor: ["#45A049", "#D5D5D5"],
      },
    ],
  };

  const formatDate = (dateString) => {
    const options = { day: "numeric", month: "short" };
    return new Date(dateString).toLocaleDateString("en-US", options);
  };

  return (
    <>
      <div className="card shadow-lg compact side bg-base-100 w-80 m-4 border border-gray-600 hover:border-primary transition-all duration-300 hover:scale-105 cursor-pointer">
        <div className="flex justify-between p-4">
          <h2 className="card-title mt-[-30px]">{name}</h2>
          <div className="flex flex-col space-y-2">
            <button className="btn btn-sm btn-ghos " onClick={showModal}>
              <FaEdit className="text-primary" />
            </button>
            <button className="btn btn-sm btn-ghost">
              <FaTrash className="text-error" />
            </button>
          </div>
        </div>
        <div className="pb-4 px-4 flex justify-between">
          <div className="flex flex-col items-center">
            <p className="font-bold">Start-Due</p>
            <div className="flex items-center gap-1">
              <p>{formatDate(startDate)}</p>
              <p>-</p>
              <p> {formatDate(dueDate)}</p>
            </div>
          </div>
          <div className="flex flex-col items-center">
            <p className="font-bold">Remaining Days</p>
            <p>{remainingDays}</p>
          </div>
        </div>
        <div className="flex justify-center pb-4 px-4">
          <div className="w-32 h-32">
            <Doughnut
              data={data}
              options={{
                cutout: "80%",
                plugins: { legend: { display: false } },
              }}
            />
          </div>
        </div>
        <Link to={`/project/${project._id}`} className="m-3 ">
          <button className="btn btn-active btn-primary w-full">Open</button>
        </Link>
      </div>
      <Modal isVisible={isVisible} hideModal={hideModal}>
        <h2 className="text-xl font-bold">Hello, Daisy UI!</h2>
        <p>This is a modal using Daisy UI and React.</p>
      </Modal>
    </>
  );
};

export default ProjectCard;
