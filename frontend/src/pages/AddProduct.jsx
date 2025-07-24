// src/pages/AddProduct.jsx
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function AddProduct() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    stock: '',
    images: [''], 
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Handle images separately
    if (name === 'image') {
      setFormData((prev) => ({
        ...prev,
        images: [value],
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, description, price, category, stock, images } = formData;

    if (!name || !price || !category || !stock || images.length === 0 || !images[0]) {
      setError('Please fill all required fields including image URL.');
      return;
    }

    try {
      await axios.post('http://localhost:5000/api/products', formData, {
        withCredentials: true,
      });
      setSuccess(true);
      navigate('/seller-products');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to add product.');
    }
  };

  return (
    <div className="min-h-screen bg-pink-50 flex items-center justify-center px-4">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-xl">
        <h2 className="text-2xl font-bold text-center text-rose-600 mb-4">Add New Product</h2>

        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        {success && <p className="text-green-600 text-center mb-4">Product added successfully!</p>}

        <form onSubmit={handleSubmit} className="space-y-5">
          <input
            type="text"
            name="name"
            placeholder="Product Name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-rose-400"
          />

          <textarea
            name="description"
            placeholder="Description"
            value={formData.description}
            onChange={handleChange}
            rows={3}
            className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-rose-400"
          ></textarea>

          <input
            type="number"
            name="price"
            placeholder="Price"
            value={formData.price}
            onChange={handleChange}
            className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-rose-400"
          />

          <input
            type="text"
            name="category"
            placeholder="Category"
            value={formData.category}
            onChange={handleChange}
            className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-rose-400"
          />

          <input
            type="number"
            name="stock"
            placeholder="Stock"
            value={formData.stock}
            onChange={handleChange}
            className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-rose-400"
          />

          <input
            type="text"
            name="image"
            placeholder="Image URL"
            value={formData.images[0]}
            onChange={handleChange}
            className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-rose-400"
          />

          <button
            type="submit"
            className="w-full bg-rose-500 text-white py-3 rounded hover:bg-rose-600 transition-all font-semibold"
          >
          Add Product
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddProduct;
