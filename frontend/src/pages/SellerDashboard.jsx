// src/pages/SellerDashboard.jsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  FaBoxOpen,
  FaPlus,
  FaClipboardList,
  FaSignOutAlt,
  FaUserEdit,
} from 'react-icons/fa';
import { motion } from 'framer-motion';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import API from '../api/axiosConfig';
import AddProduct from './AddProduct';

function SellerDashboard() {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState('products');
  const [orderCount, setOrderCount] = useState(0);
  const [profileData, setProfileData] = useState({ username: '', email: '', password: '' });
  const [profileMsg, setProfileMsg] = useState('');

  const handleLogout = async () => {
    await API.post('/api/users/logout');
    navigate('/');
  };

  const fetchProducts = async () => {
    try {
      const res = await API.get('/api/products/mine');
      setProducts(res.data);
    } catch (err) {
      setError('Failed to load your products');
    }
  };

  const fetchOrders = async () => {
    try {
      const res = await API.get('/api/seller/orders');
      setOrderCount(res.data.length);
    } catch (err) {
      console.error('Failed to fetch orders');
    }
  };

  const fetchProfile = async () => {
    try {
      const res = await API.get('/api/seller/profile');
      setProfileData({ username: res.data.name, email: res.data.email, password: '' });
    } catch (err) {
      console.error('Failed to fetch seller profile');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this product?')) return;
    try {
      await API.delete(`/api/products/${id}`);
      toast.success('Product deleted!');
      fetchProducts();
    } catch (err) {
      toast.error('Delete failed!');
    }
  };

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    try {
      await API.put('/api/seller/profile', profileData);
      setProfileMsg('Profile updated successfully!');
    } catch (err) {
      setProfileMsg('Profile update failed.');
    }
  };

  useEffect(() => {
    fetchProducts();
    fetchOrders();
    fetchProfile();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 to-pink-100 flex">
      <ToastContainer />
      {/* Sidebar */}
      <div className="w-64 bg-white p-4 shadow-2xl flex flex-col">
        <div className="text-center mb-6">
          <img src="https://via.placeholder.com/100" alt="profile" className="w-24 h-24 mx-auto rounded-full mb-2 border-4 border-rose-300" />
          <h2 className="text-lg font-semibold text-rose-600">{profileData.username || 'Seller'}</h2>
          <p className="text-sm text-gray-500">{profileData.email}</p>
        </div>

        {/* Navigation */}
        {[{ key: 'products', label: 'My Products', icon: <FaBoxOpen /> },
          { key: 'add', label: 'Add Product', icon: <FaPlus /> },
          { key: 'orders', label: 'My Orders', icon: <FaClipboardList /> },
          { key: 'editProfile', label: 'Edit Profile', icon: <FaUserEdit /> }].map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`flex items-center gap-2 mb-3 px-3 py-2 rounded text-left ${activeTab === tab.key ? 'bg-rose-500 text-white' : 'text-rose-600 hover:bg-rose-100'}`}
          >
            {tab.icon} {tab.label}
            {tab.key === 'orders' && (
              <span className="ml-auto bg-white text-rose-600 text-xs font-bold px-2 py-0.5 rounded-full">{orderCount}</span>
            )}
          </button>
        ))}

        <div className="mt-auto">
          <button onClick={handleLogout} className="flex items-center gap-2 px-3 py-2 text-red-600 hover:bg-red-100 rounded">
            <FaSignOutAlt /> Logout
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6">
        {activeTab === 'products' && (
          <>
            <h1 className="text-2xl font-semibold text-rose-700 mb-4">Your Products</h1>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
              <div className="bg-rose-100 p-4 rounded-xl shadow-md text-center">
                <p className="text-sm text-gray-700">Total Products</p>
                <p className="text-2xl font-bold text-rose-700">{products.length}</p>
              </div>
              <div className="bg-violet-100 p-4 rounded-xl shadow-md text-center">
                <p className="text-sm text-gray-700">Total Orders</p>
                <p className="text-2xl font-bold text-violet-700">{orderCount}</p>
              </div>
              <div className="bg-green-100 p-4 rounded-xl shadow-md text-center">
                <p className="text-sm text-gray-700">Total Stock</p>
                <p className="text-2xl font-bold text-green-700">{products.reduce((a, c) => a + c.stock, 0)}</p>
              </div>
            </div>

            {error && <p className="text-red-500">{error}</p>}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {products.map((product) => (
                <motion.div key={product._id} whileHover={{ scale: 1.02 }} className="bg-white p-4 rounded-xl shadow-md">
                  <img src={product.images[0]} alt={product.name} className="w-full h-40 object-cover rounded" />
                  <h2 className="mt-2 text-lg font-bold text-rose-600">{product.name}</h2>
                  <p className="text-sm text-gray-600">{product.category}</p>
                  <p className="text-rose-500 font-semibold">₹{product.price}</p>
                  <p className="text-xs text-gray-500">Stock: {product.stock}</p>
                  <div className="flex justify-between mt-4">
                    <button onClick={() => navigate(`/edit-product/${product._id}`)} className="text-blue-500 hover:underline">Edit</button>
                    <button onClick={() => handleDelete(product._id)} className="text-red-500 hover:underline">Delete</button>
                  </div>
                </motion.div>
              ))}
            </div>
          </>
        )}

        {activeTab === 'add' && <AddProduct onProductAdded={fetchProducts} />}

        {activeTab === 'orders' && (
          <div className="text-center text-gray-600">
            <p>Click the button below to view your orders.</p>
            <button onClick={() => navigate('/seller-orders')} className="mt-4 bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600">
              Go to My Orders
            </button>
          </div>
        )}

        {activeTab === 'editProfile' && (
          <div className="max-w-lg mx-auto bg-white p-6 rounded-xl shadow-md">
            <h2 className="text-xl font-bold text-rose-600 mb-4 text-center"> Edit Profile</h2>
            {profileMsg && <p className="text-center text-sm text-green-600 mb-2">{profileMsg}</p>}
            <form onSubmit={handleProfileUpdate} className="space-y-4">
              {['username', 'email', 'password'].map((field) => (
                <input
                  key={field}
                  type={field === 'email' ? 'email' : field === 'password' ? 'password' : 'text'}
                  name={field}
                  placeholder={field[0].toUpperCase() + field.slice(1)}
                  value={profileData[field]}
                  onChange={(e) => setProfileData({ ...profileData, [field]: e.target.value })}
                  className="w-full p-2 border rounded"
                />
              ))}
              <button type="submit" className="w-full bg-rose-500 text-white py-2 rounded hover:bg-rose-600">Update Profile</button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}

export default SellerDashboard;




