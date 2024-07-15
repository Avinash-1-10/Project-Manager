import React from 'react';
import { MdDashboard } from 'react-icons/md';
import { GoHomeFill } from 'react-icons/go';
import { FaUsers } from 'react-icons/fa';
import { FiActivity } from 'react-icons/fi';
import { IoMdSettings } from 'react-icons/io';
import { IoLogOut } from 'react-icons/io5';
import { PiCardsFill } from 'react-icons/pi';
import { IoMdAdd } from 'react-icons/io';
import Logo from './Logo';
import { NavLink, useLocation, useNavigate } from 'react-router-dom'; // Import useLocation
import Modal from './Modal';
import useModal from '../hooks/useModal';
import axios from 'axios';
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const Sidebar = () => {
  const { isVisible, showModal, hideModal } = useModal();
  const navigate = useNavigate();
  const menus = [
    {
      name: 'Home',
      path: '/',
      icon: GoHomeFill,
    },
    {
      name: 'Create',
      path: '/create',
      icon: IoMdAdd,
    },
    {
      name: 'Projects',
      path: '/projects',
      icon: PiCardsFill,
    },
    {
      name: 'Dashboard',
      path: '/dashboard',
      icon: MdDashboard,
    },
    {
      name: 'Members',
      path: '/members',
      icon: FaUsers,
    },
    {
      name: 'Activity',
      path: '/activity',
      icon: FiActivity,
    },
    {
      name: 'Settings',
      path: '/settings',
      icon: IoMdSettings,
    },
  ];

  const location = useLocation(); // Get the current location

  const handleLogout = async () => {
    try {
      const response = await axios.post(`${BACKEND_URL}/auth/logout`);
      if (response.status === 200) {
        localStorage.removeItem('projex_token');
        localStorage.removeItem('projex_user');
        navigate('/login');
      }
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };
  return (
    <>
      <div className='flex flex-col gap-5 border-r border-r-gray-600 px-5 py-5 w-56 h-screen shadow-md'>
        <Logo />
        {menus.map((menu, index) => (
          <NavLink
            key={index}
            to={menu.path}
            className={`flex items-center gap-3 p-2 rounded-lg hover:bg-gray-200 hover:text-gray-700 cursor-pointer transition-all duration-200 ${
              location.pathname === menu.path ? 'bg-blue-500 text-white' : '' // Apply active styles
            }`}
          >
            <menu.icon className='text-lg' />
            <span>{menu.name}</span>
          </NavLink>
        ))}
        <div
          className={`flex items-center gap-3 p-2 rounded-lg hover:bg-gray-200 hover:text-gray-700 cursor-pointer transition-all duration-200 `}
          onClick={showModal}
        >
          <IoLogOut className='text-lg' />
          <span>Logout</span>
        </div>
      </div>
      <Modal isVisible={isVisible} hideModal={hideModal}>
        <div className=' rounded-lg overflow-hidden transform transition-all max-w-md w-full'>
          <div className='px-6 py-4'>
            <h2 className='text-2xl font-semibold text-center mb-4'>
              Confirm Logout
            </h2>
            <p className='text-center text-lg mb-6'>
              Are you sure you want to logout?
            </p>
            <div className='flex justify-center gap-4'>
              <button
                onClick={hideModal}
                className='bg-gray-500 hover:bg-gray-700 text-white py-2 px-4 rounded-md transition duration-300'
              >
                Cancel
              </button>
              <button
                onClick={handleLogout}
                className='bg-red-500 hover:bg-red-700 text-white py-2 px-4 rounded-md transition duration-300'
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default Sidebar;
