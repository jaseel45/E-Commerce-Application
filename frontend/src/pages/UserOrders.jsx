// src/pages/UserOrders.jsx
import React, { useEffect, useState } from 'react';
import API from '../api/axiosConfig';
import {
  Loader2,
  PackageCheck,
  Truck,
  CreditCard,
  IndianRupee,
  BadgeCheck,
  Hourglass,
} from 'lucide-react';
import { motion } from 'framer-motion';

function UserOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const { data } = await API.get('/api/orders/myorders');
        console.log("Fetched orders:", data);
        setOrders(data);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to fetch orders');
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-rose-50 to-rose-100 p-6 dark:bg-gray-900 dark:text-white">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-4xl font-extrabold text-rose-700 dark:text-white text-center mb-10 drop-shadow">
          Your Orders
        </h2>

        {loading ? (
          <div className="flex justify-center items-center mt-10">
            <Loader2 className="animate-spin h-8 w-8 text-rose-600" />
            <span className="ml-2 text-rose-600 font-medium">Loading your orders...</span>
          </div>
        ) : error ? (
          <p className="text-center text-red-600 font-semibold">{error}</p>
        ) : orders.length === 0 ? (
          <p className="text-center text-gray-600 text-lg">You haven’t placed any orders yet.</p>
        ) : (
          <div className="grid gap-8">
            {orders.map((order) => (
              <motion.div
                key={order._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-xl border border-rose-200 dark:border-gray-700 p-6 hover:shadow-2xl transition"
              >
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4 gap-2">
                  <div className="flex items-center gap-2 text-rose-700 dark:text-rose-400 font-semibold text-sm sm:text-base">
                    <PackageCheck className="w-5 h-5" />
                    Order ID: <span className="font-mono">{order._id}</span>
                  </div>

                  <div className="flex items-center gap-3 text-sm">
                    <span className="bg-rose-100 text-rose-700 px-3 py-1 rounded-full font-medium dark:bg-rose-900/20 dark:text-rose-300">
                      {order.orderItems.length} item{order.orderItems.length > 1 ? 's' : ''}
                    </span>
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-semibold ${
                        order.isPaid
                          ? 'bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-300'
                          : 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/20 dark:text-yellow-300'
                      }`}
                    >
                      {order.isPaid ? (
                        <span className="inline-flex items-center gap-1">
                          <BadgeCheck className="w-4 h-4" /> Paid
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1">
                          <Hourglass className="w-4 h-4 animate-pulse" /> Pending
                        </span>
                      )}
                    </span>
                  </div>
                </div>

                <ul className="divide-y divide-rose-100 dark:divide-gray-600 mb-4">
                  {order.orderItems.map((item, index) => (
                    <li key={index} className="py-2 flex justify-between text-sm sm:text-base text-gray-700 dark:text-gray-200">
                      <span> {item.name} × {item.quantity}</span>
                      <span className="font-medium">₹{item.price * item.quantity}</span>
                    </li>
                  ))}
                </ul>

                <div className="text-sm text-gray-600 dark:text-gray-300 space-y-1 mb-2">
                  <p className="flex items-center gap-2">
                    <Truck className="w-4 h-4 text-rose-500" />
                    Shipping: {order.shippingAddress?.address}, {order.shippingAddress?.city},{' '}
                    {order.shippingAddress?.postalCode}, {order.shippingAddress?.nearby}
                  </p>
                  <p className="flex items-center gap-2">
                    <CreditCard className="w-4 h-4 text-rose-500" />
                    Payment: {order.paymentMethod}
                  </p>
                </div>

                <div className="mt-4 flex justify-end items-center gap-2 text-lg font-bold text-rose-700 dark:text-rose-300">
                  <IndianRupee className="w-5 h-5" />
                  ₹{order.totalPrice}
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default UserOrders;
