// src/pages/ProductList.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import API from '../api/axiosConfig';

function ProductList() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Fetch all products from backend
    const fetchProducts = async () => {
      try {
        const res = await API.get('/api/products');
        setProducts(res.data);
      } catch (error) {
        console.error('Failed to load products:', error.message);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="min-h-screen bg-pink-50 py-10 px-4">
      <h1 className="text-3xl font-bold text-center text-rose-600 mb-6">Our Products 💅</h1>
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 max-w-6xl mx-auto">
        {products.map((product) => (
          <div key={product._id} className="bg-white rounded-xl shadow-md overflow-hidden p-4">
            <img
              src={product.images[0]}
              alt={product.name}
              className="w-full h-48 object-cover rounded"
            />
            <h2 className="mt-2 text-xl font-semibold text-rose-700">{product.name}</h2>
            <p className="text-gray-700">{product.category}</p>
            <p className="text-rose-500 font-bold">₹{product.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProductList;
