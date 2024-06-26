import Layout from "../Layout";
import React, { useEffect, useState } from "react";
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

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

import axios from "axios";
import Loader from "../components/Loader";
import { useNavigate } from "react-router-dom";
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const dummyData = [
  {
    _id: "667a5f4442fd5d0dc607272e",
    name: "Task Manager",
    totalDays: 351,
    remainingDays: 364,
  },
  {
    _id: "667a5f5a42fd5d0dc6072730",
    name: "Task Manager",
    totalDays: 14,
    remainingDays: 13,
  },
  {
    _id: "667a5fc0063c78d5f9e96695",
    name: "Task Manager",
    totalDays: 14,
    remainingDays: 13,
  },
  {
    _id: "667a61423af09ff9be23067e",
    name: "Task Manager",
    totalDays: 14,
    remainingDays: 13,
  },
  {
    _id: "667bf6a044ee9cb81a9cddbf",
    name: "Project Manager",
    totalDays: 14,
    remainingDays: 14,
  },
  {
    _id: "667bf81403a2eb940c7a353f",
    name: "Project Manager",
    totalDays: 14,
    remainingDays: 14,
  },
  {
    _id: "667bfb687aff07b8c751e62c",
    name: "Pojex",
    totalDays: 14,
    remainingDays: 14,
  },
  {
    _id: "667bfb9be0082325e25be11b",
    name: "Pojex",
    totalDays: 14,
    remainingDays: 14,
  },
];

const Home = () => {
  const [labels, setLabels] = useState([]);
  const [totalDays, setTotalDays] = useState([]);
  const [remainingDays, setRemainingDays] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const getProjectDetails = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(
        `${BACKEND_URL}/projects/stats/deadline`
      );
      const projectData = data.data;
      setLabels(projectData.map((project) => project.name));
      setTotalDays(projectData.map((project) => project.totalDays));
      setRemainingDays(projectData.map((project) => project.remainingDays));
    } catch (error) {
      console.error("Error fetching project data:", error.message);
      if(error.response.status===401){
        navigate('/login')
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getProjectDetails();
  }, []);

  const data = {
    labels,
    datasets: [
      {
        label: "Total Days",
        data: totalDays,
        backgroundColor: "#3B82F6",
        borderColor: "white",
        borderWidth: 1,
      },
      {
        label: "Remaining Days",
        data: remainingDays,
        backgroundColor: "#10B981",
        borderColor: "white",
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { position: "top" },
      title: { display: true, text: "Project Progress and Remaining Time" },
    },
    scales: {
      x: { title: { display: true, text: "Projects" } },
      y: { title: { display: true, text: "Days" } },
    },
  };

  return (
    <Layout>
      <div className="container mx-auto p-4">
        {loading ? (
          <div className="flex justify-center items-center h-screen">
            <Loader/>
          </div>
        ) : (
          <div className=" rounded-lg p-6">
            <Bar data={data} options={options} />
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Home;
