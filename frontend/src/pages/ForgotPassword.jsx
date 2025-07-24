// src/pages/ForgotPassword.jsx
import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import API from '../api/axiosConfig';

function ForgotPassword() {
  const [email, setEmail] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await API.post('/api/users/forgot-password', { email });
      toast.success(res.data.message || 'Password reset link sent!');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Something went wrong');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-rose-50 px-4">
      <form onSubmit={handleSubmit} className="max-w-md w-full bg-white p-8 rounded-xl shadow-xl">
        <h2 className="text-2xl font-bold mb-6 text-center text-rose-600">Forgot Password</h2>
        <input
          type="email"
          placeholder="Enter your registered email"
          className="w-full p-3 border border-rose-300 rounded-lg mb-4"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button
          type="submit"
          className="w-full bg-rose-500 text-white py-3 rounded-lg hover:bg-rose-600 transition"
        >
          Send Reset Link
        </button>
      </form>
    </div>
  );
}

export default ForgotPassword;
