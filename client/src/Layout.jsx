import React from "react";
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";

const Layout = ({ children }) => {
  return (
    <div className="flex gap-5">
      <div>
        <Sidebar />
      </div>
      <div className="flex-1 overflow-y-scroll h-screen">
        <Navbar />
        {children}
      </div>
    </div>
  );
};

export default Layout;
