import React, { useState } from "react";
import { FcGoogle } from "react-icons/fc"; // Google icon
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai"; // Eye icons

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword((prevState) => !prevState);
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="w-full max-w-md p-8 space-y-6 border border-gray-700 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center">Register</h2>
        <form className="space-y-4">
          <div className="flex space-x-4">
            <div className="form-control w-1/2">
              <label className="label">
                <span className="label-text">First Name</span>
              </label>
              <input
                type="text"
                placeholder="First Name"
                className="input input-bordered w-full"
              />
            </div>
            <div className="form-control w-1/2">
              <label className="label">
                <span className="label-text">Last Name</span>
              </label>
              <input
                type="text"
                placeholder="Last Name"
                className="input input-bordered w-full"
              />
            </div>
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Username</span>
            </label>
            <input
              type="text"
              placeholder="Username"
              className="input input-bordered w-full"
            />
          </div>
          <div className="form-control relative">
            <label className="label">
              <span className="label-text">Password</span>
            </label>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className="input input-bordered w-full"
            />
            <div
              className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer mt-9"
              onClick={togglePasswordVisibility}
            >
              {showPassword ? (
                <AiFillEyeInvisible size={24} />
              ) : (
                <AiFillEye size={24} />
              )}
            </div>
          </div>
          <div className="form-control relative">
            <label className="label">
              <span className="label-text">Confirm Password</span>
            </label>
            <input
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirm Password"
              className="input input-bordered w-full"
            />
            <div
              className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer mt-9"
              onClick={toggleConfirmPasswordVisibility}
            >
              {showConfirmPassword ? (
                <AiFillEyeInvisible size={24} />
              ) : (
                <AiFillEye size={24} />
              )}
            </div>
          </div>
          <div className="form-control">
            <button type="submit" className="btn btn-primary w-full">
              Register
            </button>
          </div>
        </form>
        <div className="divider">OR</div>
        <div className="form-control">
          <button className="btn btn-outline w-full flex items-center justify-center space-x-2 hover:bg-gray-700 hover:text-white">
            <FcGoogle size={24} />
            <span>Register with Google</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Register;
