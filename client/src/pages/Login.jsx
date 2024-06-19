import React from 'react';
import { FcGoogle } from 'react-icons/fc'; // Google icon
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';


// Custom validation schema
const schema = yup.object().shape({
  emailOrUsername: yup
    .string()
    .required('Email or Username is required')
    .test('is-email-or-username', 'Invalid Email or Username', (value) => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const usernameRegex = /^[a-zA-Z0-9_]{3,20}$/; // Example regex for username
      return emailRegex.test(value) || usernameRegex.test(value);
    }),
  password: yup.string().required('Password is required').min(6, 'Password must be at least 6 characters'),
});

const Login = () => {
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    try {
      const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/login`, data);
      if (response.status === 200) {
        navigate('/');
      }
    } catch (error) {
      console.error('Login failed:', error);
      // Handle error (e.g., show a notification to the user)
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen ">
      <div className="w-full max-w-md p-8 space-y-6 border border-gray-600 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center">Login</h2>
        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Email or Username</span>
            </label>
            <input
              type="text"
              placeholder="Enter your email or username"
              className="input input-bordered w-full"
              {...register('emailOrUsername')}
            />
            {errors.emailOrUsername && <p className="text-red-600">{errors.emailOrUsername.message}</p>}
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Password</span>
            </label>
            <input
              type="password"
              placeholder="Enter your password"
              className="input input-bordered w-full"
              {...register('password')}
            />
            {errors.password && <p className="text-red-600">{errors.password.message}</p>}
          </div>
          <div className="form-control">
            <button type="submit" className="btn btn-primary w-full">
              Login
            </button>
          </div>
        </form>
        <div className="divider">OR</div>
        <div className="form-control">
          <button className="btn btn-outline w-full flex items-center justify-center space-x-2 hover:bg-gray-700 hover:text-white">
            <FcGoogle size={24} />
            <span>Sign in with Google</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
