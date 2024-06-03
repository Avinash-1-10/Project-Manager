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

const Sidebar = () => {
  const menus = [
    {
      name: "Home",
      path: "/",
      icon: GoHomeFill,
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
  return (
    <div className="flex flex-col gap-5 border-r border-r-gray-600 px-5 py-5 w-56 h-screen shadow-md">
      <Logo />
      <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-200 hover:text-gray-700 cursor-pointer transition-all duration-200">
        <IoMdAdd />
        <p>Create</p>
      </div>
      {menus.map((menu, index) => (
        <div
          key={index}
          className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-200 hover:text-gray-700 cursor-pointer transition-all duration-200"
        >
          <menu.icon className="text-lg" />
          <span>{menu.name}</span>
        </div>
      ))}
    </div>
  );
};

export default Sidebar;
