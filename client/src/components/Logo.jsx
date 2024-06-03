import React from "react";
import { FaInfinity } from "react-icons/fa6";

const Logo = () => {
  return (
    <div className="flex items-center gap-3 p-2 text-blue-500">
      <FaInfinity className="text-3xl" />
      <p className="text-3xl logoFont">Projex</p>
    </div>
  );
};

export default Logo;
