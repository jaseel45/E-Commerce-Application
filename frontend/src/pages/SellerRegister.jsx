import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { motion } from 'framer-motion';
import API from '../api/axiosConfig';

function SellerRegister() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { username, email, password, confirmPassword } = formData;

    if (!username || !email || !password || !confirmPassword) {
      setError('All fields are required.');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Please enter a valid email address.');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    setLoading(true);
    try {
      await API.post(
        '/api/seller/signup',
        {
          name: username,
          email,
          password,
          role: 'seller',
        },
        { withCredentials: true }
      );
      alert('Seller registration successful!');
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4 bg-gradient-to-br from-rose-100 via-pink-50 to-rose-200"
    >
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative w-full max-w-md p-8 rounded-3xl shadow-2xl bg-white/60 backdrop-blur-md border border-rose-200"
      >
        <div className="text-center mb-6">
          <h1 className="text-4xl font-extrabold text-rose-600 drop-shadow-lg">ShopEase</h1>
          <p className="text-sm text-gray-700 mt-1">Become a Seller and grow your beauty business.</p>
        </div>

        {error && <p className="text-red-500 text-sm text-center mb-4">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block mb-1 text-rose-700 font-semibold">Name</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-rose-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-400 bg-white shadow-inner"
              placeholder="Your name"
            />
          </div>

          <div>
            <label className="block mb-1 text-rose-700 font-semibold">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-rose-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-400 bg-white shadow-inner"
              placeholder="Your email"
            />
          </div>

          <div className="relative">
            <label className="block mb-1 text-rose-700 font-semibold">Password</label>
            <input
              type={showPassword ? 'text' : 'password'}
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-3 pr-10 border border-rose-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-400 bg-white shadow-inner"
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
            <label className="block mb-1 text-rose-700 font-semibold">Confirm Password</label>
            <input
              type={showConfirm ? 'text' : 'password'}
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="w-full px-4 py-3 pr-10 border border-rose-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-400 bg-white shadow-inner"
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
            {loading ? 'Registering...' : 'Register as Seller'}
          </motion.button>
        </form>

        <p className="mt-6 text-sm text-center text-black">
          Already have an account?{' '}
          <Link to="/" className="text-rose-600 font-semibold hover:underline">
            Login
          </Link>
        </p>
      </motion.div>
    </div>
  );
}

export default SellerRegister;
