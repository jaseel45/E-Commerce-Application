// src/pages/SellerProducts.jsx

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { BadgeCheck, AlertTriangle } from 'lucide-react';

function SellerProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchSellerProducts = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/products/mine', {
          withCredentials: true,
        });
        setProducts(res.data);
      } catch (err) {
        console.error('Failed to load products', err);
        setError('Failed to load products');
      } finally {
        setLoading(false);
      }
    };

    fetchSellerProducts();
  }, []);

  if (loading) return <div className="text-center mt-10 text-gray-600">Loading products...</div>;
  if (error) return <div className="text-center mt-10 text-red-500">{error}</div>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 to-rose-100 px-6 py-10">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-extrabold text-center text-rose-700 mb-10 tracking-tight">
          Your Products 
        </h1>

        {products.length === 0 ? (
          <p className="text-center text-gray-600 text-lg">No products found.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product) => (
              <div
                key={product._id}
                className="bg-white rounded-2xl shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition duration-300 ease-in-out overflow-hidden"
              >
                <img
                  src={product.images[0]}
                  alt={product.name}
                  className="w-full h-56 object-cover"
                />
                <div className="p-5">
                  <h2 className="text-xl font-bold text-rose-700 mb-1">{product.name}</h2>
                  <p className="text-sm text-gray-600 mb-3 line-clamp-2">{product.description}</p>
                  
                  <div className="flex justify-between items-center mb-2">
                    <p className="text-lg font-bold text-rose-500">₹{product.price}</p>
                    <p className="text-xs text-gray-500">
                      Stock: <span className="font-semibold">{product.stock}</span>
                    </p>
                  </div>

                  {product.stock === 0 ? (
                    <div className="flex items-center text-sm text-red-600">
                      <AlertTriangle size={16} className="mr-1" />
                      Out of Stock
                    </div>
                  ) : product.stock < 5 ? (
                    <div className="flex items-center text-sm text-orange-500">
                      <AlertTriangle size={16} className="mr-1" />
                      Low Stock
                    </div>
                  ) : (
                    <div className="flex items-center text-sm text-green-600">
                      <BadgeCheck size={16} className="mr-1" />
                      In Stock
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default SellerProducts;
