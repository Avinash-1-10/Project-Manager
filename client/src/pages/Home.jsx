import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import Layout from "../Layout";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const dummyData = [
  { name: "Project A", startDate: "2024-01-01", endDate: "2024-12-31" },
  { name: "Project B", startDate: "2024-03-01", endDate: "2024-11-15" },
  { name: "Project C", startDate: "2024-06-01", endDate: "2024-08-30" },
  { name: "Project C", startDate: "2024-09-01", endDate: "2024-10-10" },
];

const calculateDays = (startDate, endDate) => {
  const start = new Date(startDate);
  const end = new Date(endDate);
  const diffTime = Math.abs(end - start);
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
};

const calculateRemainingDays = (endDate) => {
  const end = new Date(endDate);
  const current = new Date();
  const diffTime = Math.abs(end - current);
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
};

const Home = () => {
  const labels = dummyData.map((project) => project.name);
  const totalDays = dummyData.map((project) =>
    calculateDays(project.startDate, project.endDate)
  );
  const remainingDays = dummyData.map((project) =>
    calculateRemainingDays(project.endDate)
  );

  const data = {
    labels,
    datasets: [
      {
        label: "Total Days",
        data: totalDays,
        backgroundColor: "#3B82F6", // Light blue
        borderColor: "white", // Blue
        borderWidth: 1,
      },
      {
        label: "Remaining Days",
        data: remainingDays,
        backgroundColor: "#10B981", // Light orange
        borderColor: "white", // Orange
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true, // Ensure chart adapts to different screen sizes
    plugins: {
      legend: {
        position: "top", // Display legend at the top
      },
      title: {
        display: true,
        text: "Project Progress and Remaining Time", // Chart title
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Projects", // X-axis label
        },
      },
      y: {
        title: {
          display: true,
          text: "Days", // Y-axis label
        },
      },
    },
  };

  return (
    <Layout>
      <div className="container mx-auto p-4">
        <div className=" rounded-lg p-6">
          <Bar data={data} options={options} />
        </div>
      </div>
    </Layout>
  );
};

export default Home;
