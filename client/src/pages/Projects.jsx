import React from 'react';
import Layout from '../Layout';
import ProjectCard from '../components/ProjectCard';

const Projects = () => {
  const projects = [
    {
      name: 'New Website Design',
      startDate: '2024-06-01',
      dueDate: '2024-07-05',
    },
    {
      name: 'Mobile App Development',
      startDate: '2024-03-25',
      dueDate: '2024-06-25',
    },
    {
      name: 'Marketing Campaign',
      startDate: '2024-04-10',
      dueDate: '2024-08-10',
    },
    {
      name: 'Product Launch',
      startDate: '2024-02-01',
      dueDate: '2024-05-01',
    },
    {
        name: 'Product Launch',
        startDate: '2024-02-01',
        dueDate: '2024-05-01',
      },
  ];

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
