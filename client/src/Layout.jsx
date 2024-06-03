import React from "react";
import Sidebar from "./components/Sidebar";

const Layout = ({ children }) => {
  return (
    <div className="flex gap-5">
      <div>
        <Sidebar />
      </div>
      <div style={{ flex: 1 }}>{children}</div>
    </div>
  );
};

export default Layout;
