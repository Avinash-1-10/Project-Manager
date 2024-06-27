import React from 'react';

const Toast = ({ message, type, onClose }) => {
  const typeClasses = {
    success: 'bg-green-500 text-white',
    error: 'bg-red-500 text-white',
    info: 'bg-blue-500 text-white',
    warning: 'bg-yellow-500 text-black',
  };

  return (
    <div className={`${typeClasses[type]} p-4 mb-4 rounded-lg shadow-lg`}>
      <div className="flex justify-between items-center">
        <div>{message}</div>
        <button className="ml-4" onClick={onClose}>✕</button>
      </div>
    </div>
  );
};

export default Toast;
