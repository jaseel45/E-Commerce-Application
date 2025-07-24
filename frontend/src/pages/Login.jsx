// src/pages/Home.jsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

function Login() {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = formData;

    if (!email || !password) {
      setError('All fields are required.');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Enter a valid email address.');
      return;
    }

    try {
      const res = await axios.post('http://localhost:5000/api/users/login', formData, {
        withCredentials: true,
      });

      alert('Login successful!');
      const role = res.data.role;

      if (role === 'seller') {
        navigate('/seller-dashboard');
      } else if (role === 'admin') {
        navigate('/admin-dashboard');
      } else {
        navigate('/user-dashboard');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center flex items-center justify-center px-4"
      style={{
        backgroundImage: `linear-gradient(rgba(255, 228, 235, 0.6), rgba(255, 240, 245, 0.65)), url('https://res.cloudinary.com/dyy4gxz8v/image/upload/v1752057659/pexels-828860-1749452_idvitt.jpg')`,
      }}
    >
      <div className="relative w-full max-w-md bg-white/30 backdrop-blur-xl p-8 rounded-2xl shadow-2xl overflow-hidden border border-rose-200">
        <div className="relative z-10">
          <h1 className="text-4xl font-extrabold text-rose-600 text-center mb-2 drop-shadow-lg">
            ShopEase
          </h1>
          <p className="text-center text-sm text-gray-700 mb-6">
            Shop beauty. Feel beautiful.
          </p>

          {error && <p className="text-red-500 text-sm text-center mb-4">{error}</p>}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block mb-1 text-rose-700 font-medium">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-rose-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-400 bg-white shadow-inner"
                placeholder="Enter the email"
              />
            </div>

            <div className="relative">
              <label className="block mb-1 text-rose-700 font-medium">Password</label>
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full px-4 py-3 pr-10 border border-rose-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-400 bg-white shadow-inner"
                placeholder="••••••••"
              />
              <div
                className="absolute top-10 right-3 text-rose-500 cursor-pointer text-lg"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-rose-500 text-white py-3 rounded-lg hover:bg-rose-600 transition-all duration-300 font-semibold shadow-md hover:shadow-lg"
            >
             Login
            </button>
          </form>

          <p className="mt-6 text-sm text-center text-black">
            Are you a User?{' '}
            <Link to="/register" className="text-rose-600 font-semibold hover:underline">
              Create Account
            </Link>
          </p>

          <p className="mt-2 text-sm text-center text-black">
            Are you a Seller?{' '}
            <Link to="/seller-register" className="text-rose-600 font-semibold hover:underline">
              Create Account
            </Link>
          </p>

          <p className="text-xs text-center text-black mt-2 hover:underline">
            <Link to="/forgot-password" className="hover:underline">
              Forgot Password?
            </Link>
          </p>

        </div>
      </div>
    </div>
  );
}

export default Login;
