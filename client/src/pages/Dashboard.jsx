import React from "react";
import { Pie, Line, Bar } from "react-chartjs-2";
import "chart.js/auto";
import Layout from "../Layout";

const Dashboard = () => {
  const pieData = {
    labels: ["Total", "In Progress", "Done"],
    datasets: [
      {
        label: "Tasks",
        data: [10, 5, 8], // Example data
        backgroundColor: ["#FBBF24", "#3B82F6", "#10B981"],
      },
    ],
  };

  const lineData = {
    labels: [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday",
    ],
    datasets: [
      {
        label: "Tasks Completed",
        data: [3, 2, 2, 4, 5, 1, 3], // Example data
        borderColor: "#3B82F6",
        backgroundColor: "#BFDBFE",
        fill: false,
      },
      {
        label: "Tasks Created",
        data: [4, 3, 5, 2, 6, 4, 2], // Example data
        borderColor: "#F87171",
        backgroundColor: "#FECACA",
        fill: false,
      },
    ],
  };

  const barData = {
    labels: ["Project A", "Project B", "Project C"], // Example projects
    datasets: [
      {
        label: "Tasks per Project",
        data: [12, 19, 7], // Example data for tasks per project
        backgroundColor: ["#3B82F6", "#10B981", "#FBBF24"],
      },
    ],
  };

  const teamData = {
    labels: ["Alice", "Bob", "Charlie"], // Example team members
    datasets: [
      {
        label: "Tasks Completed",
        data: [5, 8, 6], // Example data for tasks completed by team members
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
      },
    ],
  };

  return (
    <Layout>
      <div className="container mx-auto p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="border border-gray-700 p-4 rounded-lg shadow-md">
            <h2 className="text-xl font-bold mb-4">Tasks Overview</h2>
            <Pie data={pieData} />
          </div>
          <div className="flex flex-col gap-2">
            <div className="border border-gray-700 p-4 rounded-lg shadow-md mt-auto">
              <h2 className="text-xl font-bold mb-4">Tasks per Project</h2>
              <Bar data={barData} />
            </div>
            <div className="border border-gray-700 p-4 rounded-lg shadow-md mt-auto">
              <h2 className="text-xl font-bold mb-4">
                Team Member Contributions
              </h2>
              <Bar data={teamData} />
            </div>
          </div>
        </div>
        <div className="border border-gray-700 p-4 rounded-lg shadow-md mt-4">
          <h2 className="text-xl font-bold mb-4">Tasks Over the Last Week</h2>
          <Line data={lineData} />
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
