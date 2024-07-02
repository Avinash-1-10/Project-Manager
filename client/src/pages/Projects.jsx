import React, { useEffect, useState } from "react";
import Layout from "../Layout";
import ProjectCard from "../components/ProjectCard";
import axios from "axios";
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

//   {
//     name: 'New Website Design',
//     startDate: '2024-06-01',
//     dueDate: '2024-07-05',
//   },
//   {
//     name: 'Mobile App Development',
//     startDate: '2024-03-25',
//     dueDate: '2024-06-25',
//   },
//   {
//     name: 'Marketing Campaign',
//     startDate: '2024-04-10',
//     dueDate: '2024-08-10',
//   },
//   {
//     name: 'Product Launch',
//     startDate: '2024-02-01',
//     dueDate: '2024-05-01',
//   },
//   {
//       name: 'Product Launch',
//       startDate: '2024-02-01',
//       dueDate: '2024-05-01',
//     },
// ];

const Projects = () => {
  const [loading, setLoading] = useState(false);
  const [projects, setProjects] = useState([]);

  const getProjectDetails = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(`${BACKEND_URL}/projects/stats/details`);
      const projectData = data.data;
      setProjects(projectData);
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

  return (
    <Layout>
      <div className="container mx-auto p-4">
        <div className="grid grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <ProjectCard key={index} project={project} />
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Projects;
