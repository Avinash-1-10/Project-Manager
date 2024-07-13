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
import useToast from "../hooks/useToast";
import ToastContainer from "../components/ToastContainer";
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const Home = () => {
  const [labels, setLabels] = useState([]);
  const [totalDays, setTotalDays] = useState([]);
  const [remainingDays, setRemainingDays] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { toasts, addToast, removeToast } = useToast();
  // const token = localStorage.getItem("projex_token"); 
  // const user = JSON.parse(localStorage.getItem("projex_user"));

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
      if (error.response.status === 401) {
        navigate("/login");
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
            <Loader />
          </div>
        ) : (
          <div className=" rounded-lg p-6">
            <Bar data={data} options={options} />
          </div>
        )}
      </div>
      <ToastContainer toasts={toasts} removeToast={removeToast} />
    </Layout>
  );
};

export default Home;
