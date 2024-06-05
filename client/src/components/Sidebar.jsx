import React from "react";
import { MdDashboard } from "react-icons/md";
import { GoHomeFill } from "react-icons/go";
import { FaUsers } from "react-icons/fa";
import { FiActivity } from "react-icons/fi";
import { IoMdSettings } from "react-icons/io";
import { IoLogOut } from "react-icons/io5";
import { PiCardsFill } from "react-icons/pi";
import { IoMdAdd } from "react-icons/io";
import Logo from "./Logo";
import { NavLink, useLocation } from "react-router-dom"; // Import useLocation

const Sidebar = () => {
  const menus = [
    {
      name: "Home",
      path: "/",
      icon: GoHomeFill,
    },
    {
      name: "Create",
      path: "/create",
      icon: IoMdAdd,
    },
    {
      name: "Projects",
      path: "/projects",
      icon: PiCardsFill,
    },
    {
      name: "Dashboard",
      path: "/dashboard",
      icon: MdDashboard,
    },
    {
      name: "Members",
      path: "/members",
      icon: FaUsers,
    },
    {
      name: "Activity",
      path: "/activity",
      icon: FiActivity,
    },
    {
      name: "Settings",
      path: "/settings",
      icon: IoMdSettings,
    },
    {
      name: "Logout",
      path: "/logout",
      icon: IoLogOut,
    },
  ];

  const location = useLocation(); // Get the current location

  return (
    <div className="flex flex-col gap-5 border-r border-r-gray-600 px-5 py-5 w-56 h-screen shadow-md">
      <Logo />
      {menus.map((menu, index) => (
        <NavLink
          key={index}
          to={menu.path}
          className={`flex items-center gap-3 p-2 rounded-lg hover:bg-gray-200 hover:text-gray-700 cursor-pointer transition-all duration-200 ${
            location.pathname === menu.path ? "bg-blue-500 text-white" : "" // Apply active styles
          }`}
        >
          <menu.icon className="text-lg" />
          <span>{menu.name}</span>
        </NavLink>
      ))}
    </div>
  );
};

export default Sidebar;
