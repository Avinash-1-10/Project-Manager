import React, { useState } from "react";
import { FcGoogle } from "react-icons/fc"; // Google icon
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai"; // Eye icons
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

// Validation schema
const schema = yup.object().shape({
  firstName: yup.string().required("First Name is required"),
  lastName: yup.string().required("Last Name is required"),
  username: yup
    .string()
    .required("Username is required")
    .matches(/^[a-zA-Z0-9_]{3,20}$/, "Username must be 3-20 characters and contain only letters, numbers, and underscores"),
  password: yup
    .string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters"),
  confirmPassword: yup
    .string()
    .required("Confirm Password is required")
    .oneOf([yup.ref('password')], "Passwords must match"),
});

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });

  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword((prevState) => !prevState);
  };

  const onSubmit = async (data) => {
    console.log("Form Data: ", data);
    // Handle form submission
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="w-full max-w-md p-8 space-y-6 border border-gray-700 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center">Register</h2>
        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
          <div className="flex space-x-4">
            <div className="form-control w-1/2">
              <label className="label">
                <span className="label-text">First Name</span>
              </label>
              <input
                type="text"
                placeholder="First Name"
                className="input input-bordered w-full"
                {...register("firstName")}
              />
              {errors.firstName && <p className="text-red-600">{errors.firstName.message}</p>}
            </div>
            <div className="form-control w-1/2">
              <label className="label">
                <span className="label-text">Last Name</span>
              </label>
              <input
                type="text"
                placeholder="Last Name"
                className="input input-bordered w-full"
                {...register("lastName")}
              />
              {errors.lastName && <p className="text-red-600">{errors.lastName.message}</p>}
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
              {...register("username")}
            />
            {errors.username && <p className="text-red-600">{errors.username.message}</p>}
          </div>
          <div className="form-control relative">
            <label className="label">
              <span className="label-text">Password</span>
            </label>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className="input input-bordered w-full"
              {...register("password")}
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
            {errors.password && <p className="text-red-600">{errors.password.message}</p>}
          </div>
          <div className="form-control relative">
            <label className="label">
              <span className="label-text">Confirm Password</span>
            </label>
            <input
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirm Password"
              className="input input-bordered w-full"
              {...register("confirmPassword")}
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
            {errors.confirmPassword && <p className="text-red-600">{errors.confirmPassword.message}</p>}
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
