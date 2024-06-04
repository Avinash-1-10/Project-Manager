import React from "react";
import {
  AiOutlineCode,
  AiOutlineInfoCircle,
  AiOutlineSetting,
} from "react-icons/ai";

const Navbar = () => {
  return (
    <div className="flex justify-between items-center w-full px-10 py-3 gap-10">
      <button className="bg-gray-700 text-white hover:bg-gray-800 transition-all duration-300 px-3 py-2 rounded-md font-semibold text-sm">
        My Dashboard
      </button>
      <div className="flex gap-10">
        <span className="flex items-center gap-2">
          <AiOutlineCode className="text-lg" />
          <p>Code</p>
        </span>
        <span className="flex items-center gap-1">
          <AiOutlineInfoCircle className="text-lg" />
          <p>About us</p>
        </span>

        <span className="flex items-center gap-1">
          <AiOutlineSetting className="text-lg" />
          <p>Settings</p>
        </span>
        <div className="avatar">
          <div className="w-10 rounded-full">
            <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
