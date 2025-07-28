// src/pages/AddProduct.jsx
import React, { useState } from 'react';
import API from '../api/axiosConfig';
import { toast } from 'react-toastify';

function AddProduct({ onProductAdded }) {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    stock: '',
    images: [''],
  });

  const [uploading, setUploading] = useState(false);
  const [formError, setFormError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const data = new FormData();
    data.append('file', file);
    data.append('upload_preset', 'ecommerce_preset');
    data.append('cloud_name', 'dyy4gxz8v');

    setUploading(true);
    try {
      const res = await fetch('https://api.cloudinary.com/v1_1/dyy4gxz8v/image/upload', {
        method: 'POST',
        body: data,
      });
      const result = await res.json();
      setFormData((prev) => ({ ...prev, images: [result.secure_url] }));
      toast.success('Image uploaded!');
    } catch (err) {
      toast.error('Image upload failed.');
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, price, category, stock, images } = formData;
    if (!name || !price || !category || !stock || images.length === 0 || !images[0]) {
      setFormError('Please fill all required fields and upload an image.');
      return;
    }

    try {
      await API.post('/api/products', formData);
      toast.success('Product added!');
      setFormData({ name: '', description: '', price: '', category: '', stock: '', images: [''] });
      onProductAdded();
    } catch (err) {
      setFormError(err.response?.data?.message || 'Failed to add product.');
    }
  };

  return (
    <div className="max-w-xl mx-auto bg-white p-6 rounded-xl shadow-md">
      <h2 className="text-xl font-bold text-rose-600 mb-4 text-center">Add Product</h2>
      {formError && <p className="text-red-500 text-sm mb-2 text-center">{formError}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Name, Description, Price, Stock */}
        {['name', 'description', 'price', 'stock'].map((field) => (
          <input
            key={field}
            type={field === 'description' ? 'textarea' : field === 'price' || field === 'stock' ? 'number' : 'text'}
            name={field}
            placeholder={field[0].toUpperCase() + field.slice(1)}
            value={formData[field]}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        ))}

        {/* Dropdown for Category */}
        <select
          name="category"
          value={formData.category}
          onChange={handleChange}
          className="w-full p-2 border rounded text-gray-700"
        >
          <option value="">Select Category</option>
          <option value="Skincare">Skincare</option>
          <option value="Face Care">Face Care</option>
          <option value="Beauty">Beauty</option>
          <option value="Haircare">Haircare</option>
        </select>

        {/* Image Upload Section */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Upload Product Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="block w-full text-sm text-gray-700
                       file:mr-4 file:py-2 file:px-4
                       file:rounded-full file:border-0
                       file:text-sm file:font-semibold
                       file:bg-rose-50 file:text-rose-600
                       hover:file:bg-rose-100"
          />
          {uploading && <p className="text-sm text-gray-500 mt-1">Uploading image...</p>}
          {formData.images[0] && (
            <img
              src={formData.images[0]}
              alt="Preview"
              className="mt-3 w-full h-40 object-cover rounded shadow"
            />
          )}
        </div>

        <button type="submit" className="w-full bg-rose-500 text-white py-2 rounded hover:bg-rose-600">
          Add Product
        </button>
      </form>
    </div>
  );
}

export default AddProduct;
