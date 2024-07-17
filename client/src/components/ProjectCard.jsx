import React from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Link, useNavigate } from 'react-router-dom';
import Modal from './Modal';
import useModal from '../hooks/useModal';
import axios from 'axios';
import useToast from '../hooks/useToast';
import ToastContainer from './ToastContainer';
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

ChartJS.register(ArcElement, Tooltip, Legend);

const ProjectCard = ({ project }) => {
  const { name, startDate, dueDate, totalDays, remainingDays, _id } = project;
  const { isVisible, showModal, hideModal } = useModal();
  const navigate = useNavigate();
  const { toasts, addToast, removeToast } = useToast();

  // Calculate remaining days ensuring it doesn't exceed total days
  const validRemainingDays =
    remainingDays > totalDays ? totalDays : remainingDays;

  // Calculate percentage of remaining days
  const remainingPercentage = (validRemainingDays / totalDays) * 100;

  const data = {
    datasets: [
      {
        data: [remainingPercentage, 100 - remainingPercentage],
        backgroundColor: ['#4CAF50', '#E0E0E0'],
        hoverBackgroundColor: ['#45A049', '#D5D5D5'],
      },
    ],
  };

  const formatDate = (dateString) => {
    const options = { day: 'numeric', month: 'short' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  const handleEdit = () => {
    navigate(`/project/edit/${project._id}`);
  };

  const handleDelete = async () => {
    console.log(BACKEND_URL);
    try {
      const { data } = await axios.delete(`${BACKEND_URL}/projects/${_id}`);
      addToast(data.message, 'success');
      setTimeout(() => {
        navigate('/');
      }, 1000);
    } catch (error) {}
  };

  return (
    <>
      <div className='card shadow-lg compact side bg-base-100 w-80 m-4 border border-gray-600 hover:border-primary transition-all duration-300 hover:scale-105 cursor-pointer'>
        <div className='flex justify-between p-4'>
          <h2 className='card-title mt-[-30px]'>{name}</h2>
          <div className='flex flex-col space-y-2'>
            <button className='btn btn-sm' onClick={handleEdit}>
              <FaEdit className='text-primary' />
            </button>
            <button className='btn btn-sm' onClick={showModal}>
              <FaTrash className='text-error' />
            </button>
          </div>
        </div>
        <div className='pb-4 px-4 flex justify-between'>
          <div className='flex flex-col items-center'>
            <p className='font-bold'>Start-Due</p>
            <div className='flex items-center gap-1'>
              <p>{formatDate(startDate)}</p>
              <p>-</p>
              <p> {formatDate(dueDate)}</p>
            </div>
          </div>
          <div className='flex flex-col items-center'>
            <p className='font-bold'>Remaining Days</p>
            <p>{remainingDays}</p>
          </div>
        </div>
        <div className='flex justify-center pb-4 px-4'>
          <div className='w-32 h-32'>
            <Doughnut
              data={data}
              options={{
                cutout: '80%',
                plugins: { legend: { display: false } },
              }}
            />
          </div>
        </div>
        <Link to={`/project/${project._id}`} className='m-3 '>
          <button className='btn btn-active btn-primary w-full'>Open</button>
        </Link>
      </div>
      <Modal isVisible={isVisible} hideModal={hideModal}>
        <div className='p-2'>
          <p className='text-lg font-semibold mb-6'>
            Are you sure you want to delete this project?
          </p>
          <div className='flex justify-end space-x-4'>
            <button className='btn btn-ghost' onClick={hideModal}>
              Cancel
            </button>
            <button className='btn btn-error' onClick={handleDelete}>
              Delete
            </button>
          </div>
        </div>
      </Modal>
      <ToastContainer toasts={toasts} removeToast={removeToast} />
    </>
  );
};

export default ProjectCard;
