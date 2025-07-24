// src/components/ProfileEditor.jsx
import React, { useState, useEffect } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import API from '../api/axiosConfig';

function ProfileEditor() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    currentPassword: '',
    newPassword: '',
  });

  const [showPassword, setShowPassword] = useState({
    current: false,
    new: false,
  });

  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await API.get('/api/users/profile', {
          withCredentials: true,
        });
        setFormData((prev) => ({
          ...prev,
          name: res.data.name,
          email: res.data.email,
        }));
      } catch (error) {
        setMessage(' Failed to load profile');
      }
    };
    fetchProfile();
  }, []);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    try {
      await API.put(
        '/api/users/profile',
        {
          name: formData.name,
          email: formData.email,
          currentPassword: formData.currentPassword,
          newPassword: formData.newPassword,
        },
        { withCredentials: true }
      );
      setMessage(' Profile updated successfully!');
      setFormData({ ...formData, currentPassword: '', newPassword: '' });
    } catch (error) {
      setMessage(' Update failed. Please check your current password.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-8 rounded-2xl shadow-xl mt-8 max-w-xl mx-auto border border-gray-200">
      <h2 className="text-3xl font-semibold text-center text-rose-600 mb-6">Edit Your Profile</h2>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block mb-1 text-sm font-medium text-gray-700">Name</label>
          <input
            type="text"
            name="name"
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-400"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label className="block mb-1 text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            name="email"
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-400"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label className="block mb-1 text-sm font-medium text-gray-700">Current Password</label>
          <div className="relative">
            <input
              type={showPassword.current ? 'text' : 'password'}
              name="currentPassword"
              className="w-full p-3 pr-10 border rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-400"
              value={formData.currentPassword}
              onChange={handleChange}
              required
            />
            <button
              type="button"
              onClick={() =>
                setShowPassword((prev) => ({ ...prev, current: !prev.current }))
              }
              className="absolute right-3 top-3 text-gray-600"
            >
              {showPassword.current ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
        </div>

        <div>
          <label className="block mb-1 text-sm font-medium text-gray-700">New Password</label>
          <div className="relative">
            <input
              type={showPassword.new ? 'text' : 'password'}
              name="newPassword"
              className="w-full p-3 pr-10 border rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-400"
              value={formData.newPassword}
              onChange={handleChange}
            />
            <button
              type="button"
              onClick={() =>
                setShowPassword((prev) => ({ ...prev, new: !prev.new }))
              }
              className="absolute right-3 top-3 text-gray-600"
            >
              {showPassword.new ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`w-full bg-rose-500 text-white py-3 rounded-lg font-semibold transition hover:bg-rose-600 ${
            loading ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        >
          {loading ? 'Saving...' : 'Save Changes'}
        </button>

        {message && (
          <p
            className={`text-sm text-center font-medium ${
              message.startsWith('✅') ? 'text-green-600' : 'text-red-600'
            }`}
          >
            {message}
          </p>
        )}
      </form>
    </div>
  );
}

export default ProfileEditor;
