// src/pages/Register.jsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Register() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, password, confirmPassword } = formData;

    if (!name || !email || !password || !confirmPassword) {
      toast.error('All fields are required.');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error('Please enter a valid email.');
      return;
    }

    if (password !== confirmPassword) {
      toast.error('Passwords do not match.');
      return;
    }

    setLoading(true);
    try {
      await axios.post(
        'http://localhost:5000/api/users/signup',
        { name, email, password },
        { withCredentials: true }
      );
      toast.success('Registration successful!');
      setTimeout(() => navigate('/'), 1500);
    } catch (err) {
      toast.error(err.response?.data?.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-gradient-to-br from-rose-100 via-pink-50 to-rose-200 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative w-full max-w-md p-8 rounded-3xl shadow-2xl bg-white/60 backdrop-blur-md border border-rose-200 dark:bg-gray-800/70 dark:border-gray-700"
      >
        <div className="text-center mb-6">
          <h1 className="text-4xl font-extrabold text-rose-600 drop-shadow-lg dark:text-white">ShopEase</h1>
          <p className="text-sm text-gray-700 mt-1 dark:text-gray-300">
            Create your account & enjoy shopping beautiful things.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block mb-1 text-rose-700 font-semibold dark:text-white">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-rose-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-400 bg-white shadow-inner dark:bg-gray-900 dark:text-white dark:border-gray-600"
              placeholder="Your name"
            />
          </div>

          <div>
            <label className="block mb-1 text-rose-700 font-semibold dark:text-white">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-rose-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-400 bg-white shadow-inner dark:bg-gray-900 dark:text-white dark:border-gray-600"
              placeholder="you@example.com"
            />
          </div>

          <div className="relative">
            <label className="block mb-1 text-rose-700 font-semibold dark:text-white">Password</label>
            <input
              type={showPassword ? 'text' : 'password'}
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-3 pr-10 border border-rose-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-400 bg-white shadow-inner dark:bg-gray-900 dark:text-white dark:border-gray-600"
              placeholder="••••••••"
            />
            <span
              className="absolute top-11 right-3 text-gray-500 cursor-pointer"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>

          <div className="relative">
            <label className="block mb-1 text-rose-700 font-semibold dark:text-white">Confirm Password</label>
            <input
              type={showConfirm ? 'text' : 'password'}
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="w-full px-4 py-3 pr-10 border border-rose-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-400 bg-white shadow-inner dark:bg-gray-900 dark:text-white dark:border-gray-600"
              placeholder="••••••••"
            />
            <span
              className="absolute top-11 right-3 text-gray-500 cursor-pointer"
              onClick={() => setShowConfirm(!showConfirm)}
            >
              {showConfirm ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>

          <motion.button
            type="submit"
            disabled={loading}
            whileTap={{ scale: 0.97 }}
            className={`w-full py-3 rounded-xl font-semibold text-white transition-all duration-300 ${
              loading
                ? 'bg-rose-300 cursor-not-allowed'
                : 'bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 shadow-md hover:shadow-lg'
            }`}
          >
            {loading ? (
              <div className="flex justify-center items-center gap-2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                <span>Registering...</span>
              </div>
            ) : (
              'Register'
            )}
          </motion.button>
        </form>

        <p className="mt-6 text-sm text-center text-black dark:text-gray-300">
          Already have an account?{' '}
          <Link to="/" className="text-rose-600 font-semibold hover:underline">
            Login
          </Link>
        </p>

        <ToastContainer position="top-center" />
      </motion.div>
    </div>
  );
}

export default Register;
