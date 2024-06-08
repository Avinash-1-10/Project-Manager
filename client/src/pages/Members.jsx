import React, { useState, useEffect } from 'react';
import Layout from '../Layout';

// Mock API functions
const getProjects = async () => {
    // Mock data for projects
    return [
      { id: 1, name: 'Project Alpha' },
      { id: 2, name: 'Project Beta' },
    ];
  };
  
  const getProjectMembers = async (projectId) => {
    // Mock data for project members
    const members = {
      1: [
        { id: 1, name: 'John Doe', role: 'Admin', profilePicture: 'https://via.placeholder.com/150' },
        { id: 2, name: 'Jane Smith', role: 'Editor', profilePicture: 'https://via.placeholder.com/150' },
      ],
      2: [
        { id: 3, name: 'Mark Brown', role: 'Viewer', profilePicture: 'https://via.placeholder.com/150' },
      ],
    };
    return members[projectId] || [];
  };
  
  const updateProjectMemberRole = async (projectId, memberId, newRole) => {
    // Mock function to update member role in a project
    console.log(`Project ID: ${projectId}, Member ID: ${memberId}, New Role: ${newRole}`);
  };
  
  const addProjectMember = async (projectId, email) => {
    // Mock function to add a new member to a project
    const newMember = { id: Date.now(), name: 'New Member', role: 'Viewer', profilePicture: 'https://via.placeholder.com/150' };
    return newMember;
  };
  
  const removeProjectMember = async (projectId, memberId) => {
    // Mock function to remove a member from a project
    console.log(`Project ID: ${projectId}, Member ID: ${memberId} removed`);
  };
  

const Members = () => {
  const [projects, setProjects] = useState([]);
  const [members, setMembers] = useState({});
  const [newMemberEmails, setNewMemberEmails] = useState({});

  useEffect(() => {
    // Fetch projects and their members
    getProjects().then(projectsData => {
      setProjects(projectsData);
      projectsData.forEach(project => {
        getProjectMembers(project.id).then(membersData => {
          setMembers(prevMembers => ({ ...prevMembers, [project.id]: membersData }));
        });
      });
    });
  }, []);

  const handleRoleChange = (projectId, memberId, newRole) => {
    updateProjectMemberRole(projectId, memberId, newRole).then(() => {
      // Update the member list after role change
      setMembers(prevMembers => ({
        ...prevMembers,
        [projectId]: prevMembers[projectId].map(member => 
          member.id === memberId ? { ...member, role: newRole } : member
        ),
      }));
    });
  };

  const handleAddMember = (projectId) => {
    addProjectMember(projectId, newMemberEmails[projectId]).then(newMember => {
      setMembers(prevMembers => ({
        ...prevMembers,
        [projectId]: [...prevMembers[projectId], newMember],
      }));
      setNewMemberEmails(prevEmails => ({ ...prevEmails, [projectId]: '' }));
    });
  };

  const handleRemoveMember = (projectId, memberId) => {
    removeProjectMember(projectId, memberId).then(() => {
      setMembers(prevMembers => ({
        ...prevMembers,
        [projectId]: prevMembers[projectId].filter(member => member.id !== memberId),
      }));
    });
  };

  const handleEmailChange = (projectId, email) => {
    setNewMemberEmails(prevEmails => ({ ...prevEmails, [projectId]: email }));
  };

  return (
    <Layout>
    <div className="container mx-auto pr-4">
      <h1 className="text-3xl font-bold mb-6">Project Members</h1>
      {projects.map(project => (
        <div key={project.id} className="mb-8 border p-4 rounded-md border-zinc-500 hover:border-primary">
          <h2 className="text-2xl font-bold mb-4">{project.name}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {members[project.id]?.map(member => (
              <div key={member.id} className="card shadow-lg p-4">
                <div className="flex items-center">
                  <img src={member.profilePicture} alt={`${member.name}'s profile`} className="w-16 h-16 rounded-full mr-4" />
                  <div>
                    <h2 className="text-xl">{member.name}</h2>
                    <p className="text-gray-500">{member.role}</p>
                  </div>
                  <div className="ml-auto flex space-x-2">
                    <select 
                      className="select select-bordered"
                      value={member.role}
                      onChange={(e) => handleRoleChange(project.id, member.id, e.target.value)}
                    >
                      <option value="Admin">Admin</option>
                      <option value="Editor">Editor</option>
                      <option value="Viewer">Viewer</option>
                    </select>
                    <button 
                      onClick={() => handleRemoveMember(project.id, member.id)} 
                      className="btn btn-error"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-6">
            <h3 className="text-xl font-bold mb-2">Add New Member</h3>
            <div className="flex space-x-2">
              <input 
                type="email" 
                placeholder="Enter email" 
                className="input input-bordered w-full"
                value={newMemberEmails[project.id] || ''}
                onChange={(e) => handleEmailChange(project.id, e.target.value)}
              />
              <button 
                onClick={() => handleAddMember(project.id)} 
                className="btn btn-primary"
              >
                Add
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
    </Layout>
  );
};

export default Members;
