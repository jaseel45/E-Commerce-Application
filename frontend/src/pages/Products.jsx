// src/pages/Products.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'; 
import API from '../api/axiosConfig';

function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await API.get('/api/products');
        setProducts(res.data || []);
      } catch (err) {
        console.error('Error fetching products:', err);
        setError('Failed to load products');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) return <div className="text-center mt-10 text-gray-600">Loading products...</div>;
  if (error) return <div className="text-center mt-10 text-red-500">{error}</div>;

  return (
    <div className="min-h-screen bg-pink-50 py-10 px-4">
      <h1 className="text-4xl text-rose-600 font-bold text-center mb-8">All Products</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <Link
            to={`/products/${product._id}`} 
            key={product._id}
            className="bg-white p-4 rounded-lg shadow-md hover:shadow-xl transition block"
          >
            <img
              src={product?.images?.[0] || 'https://via.placeholder.com/300x200?text=No+Image'}
              alt={product?.name || 'No name'}
              className="h-48 w-full object-cover rounded mb-4"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = 'https://via.placeholder.com/300x200?text=Image+Error';
              }}
            />
            <h2 className="text-lg font-bold text-rose-600">{product?.name || 'Unnamed Product'}</h2>
            <p className="text-gray-600 text-sm mb-2">{product?.category || 'No category'}</p>
            <p className="text-gray-800 font-semibold">₹{product?.price ?? 'N/A'}</p>
            <p className="text-xs text-gray-400 mt-1">Stock: {product?.stock ?? 'N/A'}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Products;
