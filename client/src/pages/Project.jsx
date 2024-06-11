import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from "chart.js";
import { Bar, Pie } from "react-chartjs-2";
import Layout from "../Layout";

ChartJS.register(ArcElement, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

const ProjectPage = () => {
  const projectData = {
    name: "Innovative Project",
    description: "This project aims to innovate and deliver groundbreaking solutions.",
    members: [
      { id: 1, name: "John Doe" },
      { id: 2, name: "Jane Smith" },
      { id: 3, name: "Alice Johnson" },
      { id: 4, name: "Bob Brown" },
    ],
    status: "In Progress",
    progress: {
      completed: 30,
      inProgress: 50,
      toDo: 20,
    },
    tasks: [
      { id: 1, title: "Task 1", status: "Completed", assignedTo: 1 },
      { id: 2, title: "Task 2", status: "In Progress", assignedTo: 2 },
      { id: 3, title: "Task 3", status: "To Do", assignedTo: 3 },
      { id: 4, title: "Task 4", status: "In Progress", assignedTo: 2 },
      { id: 5, title: "Task 5", status: "To Do", assignedTo: 4 },
      { id: 6, title: "Task 6", status: "Completed", assignedTo: 1 },
    ],
  };

  const memberTaskCount = projectData.members.map((member) => {
    const taskCount = projectData.tasks.filter((task) => task.assignedTo === member.id).length;
    return { member: member.name, taskCount };
  });

  const memberTaskChartData = {
    labels: memberTaskCount.map((m) => m.member),
    datasets: [
      {
        label: "Number of Tasks",
        data: memberTaskCount.map((m) => m.taskCount),
        backgroundColor: "#3498db",
        hoverBackgroundColor: "#2980b9",
      },
    ],
  };

  const progressChartData = {
    labels: ["Completed", "In Progress", "To Do"],
    datasets: [
      {
        label: "Project Progress",
        data: [
          projectData.progress.completed,
          projectData.progress.inProgress,
          projectData.progress.toDo,
        ],
        backgroundColor: ["#28a745", "#ffc107", "#dc3545"],
        hoverBackgroundColor: ["#34d05b", "#ffd700", "#e04a4e"],
      },
    ],
  };

  const taskDistributionChartData = {
    labels: ["Completed", "In Progress", "To Do"],
    datasets: [
      {
        label: "Task Distribution",
        data: [
          projectData.progress.completed,
          projectData.progress.inProgress,
          projectData.progress.toDo,
        ],
        backgroundColor: ["#28a745", "#ffc107", "#dc3545"],
        hoverBackgroundColor: ["#34d05b", "#ffd700", "#e04a4e"],
      },
    ],
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="shadow-md rounded-lg p-6">
          <h1 className="text-4xl font-bold mb-2 text-center">{projectData.name}</h1>
          <p className="text-lg text-gray-600 mb-6 text-center">{projectData.description}</p>

          <div className="flex justify-between items-center mb-6">
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => {
                // Handle create task functionality
                console.log("Create task clicked");
              }}
            >
              Create Task
            </button>
            <p className="text-lg text-gray-700 dark:text-gray-200">
              Status: <span className="font-bold">{projectData.status}</span>
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="border border-gray-500 p-4 rounded-lg shadow">
              <h2 className="text-2xl font-bold mb-4">Project Members</h2>
              <ul className="list-disc pl-5 text-white">
                {projectData.members.map((member) => (
                  <li key={member.id} className="mb-2">{member.name}</li>
                ))}
              </ul>
            </div>

            <div className="border border-gray-500 p-4 rounded-lg shadow">
              <h2 className="text-2xl font-bold mb-4">Tasks</h2>
              <ul className="list-disc pl-5 text-gray-700">
                {projectData.tasks.map((task) => (
                  <li key={task.id} className="mb-2">
                    {task.title} - <span className={`font-bold ${task.status === "Completed" ? "text-green-600" : task.status === "In Progress" ? "text-yellow-600" : "text-red-600"}`}>
                      {task.status}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="border border-gray-500 p-4 rounded-lg shadow">
              <h2 className="text-2xl font-bold mb-4">Member Task Count</h2>
              <Bar data={memberTaskChartData} />
            </div>

            <div className="border border-gray-500 p-4 rounded-lg shadow">
              <h2 className="text-2xl font-bold mb-4">Project Progress</h2>
              <Bar data={progressChartData} />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ProjectPage;
