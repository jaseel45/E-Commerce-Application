// src/pages/SellerOrders.jsx
import React, { useEffect, useState } from 'react';
import API from '../api/axiosConfig';

function SellerOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchSellerOrders = async () => {
      try {
        const { data } = await API.get('/api/seller/orders');
        setOrders(data);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to fetch orders');
      } finally {
        setLoading(false);
      }
    };

    fetchSellerOrders();
  }, []);

  return (
    <div className="min-h-screen bg-pink-50 p-6">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-3xl font-bold text-rose-600 mb-6 text-center"> Seller Orders</h2>

        {loading ? (
          <p className="text-center text-gray-500">Loading orders...</p>
        ) : error ? (
          <p className="text-center text-red-500">{error}</p>
        ) : orders.length === 0 ? (
          <p className="text-center text-gray-500">No orders found.</p>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => (
              <div
                key={order._id}
                className="border border-rose-200 rounded-lg p-4 bg-rose-50 shadow-md"
              >
                <h3 className="text-lg font-semibold text-rose-700 mb-2">
                   Order ID: {order._id}
                </h3>
                <ul className="space-y-1 text-gray-700 text-sm">
                  {order.orderItems.map((item, index) => (
                    <li key={index} className="flex justify-between border-b pb-1">
                      <span>
                         {item.name} — Qty: {item.quantity}
                      </span>
                      <span>₹{item.price * item.quantity}</span>
                    </li>
                  ))}
                </ul>
                <p className="mt-3 text-sm text-gray-600">
                   Shipping to: {order.shippingAddress?.address}, {order.shippingAddress?.city}
                </p>
                <p className="text-sm text-gray-600">💳 Payment: {order.paymentMethod}</p>
                <p className="text-sm text-gray-800 font-semibold mt-2">
                   Total: ₹{order.totalPrice}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default SellerOrders;







