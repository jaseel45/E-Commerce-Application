// src/pages/Checkout.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import API from '../api/axiosConfig';

function Checkout() {
  const navigate = useNavigate();
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [shippingAddress, setShippingAddress] = useState({
    address: '',
    city: '',
    postalCode: '',
    nearby: '',
  });
  const [paymentMethod, setPaymentMethod] = useState('COD');
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const res = await API.get('/api/cart', {
          withCredentials: true,
        });
        setCart(res.data);
      } catch (err) {
        setError('Failed to load cart.');
      } finally {
        setLoading(false);
      }
    };

    fetchCart();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setShippingAddress((prev) => ({ ...prev, [name]: value }));
  };

  const placeOrder = async () => {
    if (
      !shippingAddress.address ||
      !shippingAddress.city ||
      !shippingAddress.postalCode ||
      !shippingAddress.nearby

    ) {
      toast.error(' Please fill all address fields.');
      return;
    }

    try {
      const orderItems = cart.cartItems.map((item) => ({
        product: item.product._id,
        quantity: item.quantity,
      }));

      const totalPrice = cart.cartItems.reduce(
        (acc, item) => acc + item.product.price * item.quantity,
        0
      );

      await API.post(
        '/api/orders',
        {
          orderItems,
          shippingAddress,
          paymentMethod,
          totalPrice,
        },
        { withCredentials: true }
      );

      await API.delete('/api/cart', {
        withCredentials: true,
      });

      toast.success(' Order placed successfully!');
      setTimeout(() => navigate('/user-dashboard'), 2000);
    } catch (err) {
      toast.error(' Failed to place order.');
    }
  };

  if (loading) return <div className="text-center mt-10">Loading cart...</div>;
  if (error) return <div className="text-center mt-10 text-red-500">{error}</div>;

  return (
    <div className="min-h-screen bg-pink-50 py-10 px-4">
      <ToastContainer position="top-center" autoClose={3000} />
      <div className="max-w-4xl mx-auto bg-white p-6 rounded shadow">
        <h1 className="text-2xl font-bold text-rose-600 mb-4">Checkout</h1>

        {/* Shipping Address */}
        <div className="mb-6 space-y-2">
          <input
            type="text"
            name="address"
            placeholder="Address"
            value={shippingAddress.address}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />
          <input
            type="text"
            name="city"
            placeholder="City"
            value={shippingAddress.city}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />
          <input
            type="text"
            name="postalCode"
            placeholder="Postal Code"
            value={shippingAddress.postalCode}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />
          <input
            type="text"
            name="nearby"
            placeholder="Nearby Location"
            value={shippingAddress.nearby || ''}
            onChange={(e) =>
              setShippingAddress((prev) => ({
                ...prev,
                nearby: e.target.value,
              }))
            }
            className="w-full border p-2 rounded"
          />
        </div>

        {/* Payment Method */}
        <div className="mb-6">
          <label className="block font-semibold mb-1">Payment Method</label>
          <select
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value)}
            className="w-full border p-2 rounded"
          >
            <option value="COD">Cash on Delivery</option>
            <option value="UPI">UPI</option>
            <option value="Card">Card</option>
          </select>
        </div>

        {/* Cart Summary */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-2">Order Summary:</h2>
          {cart.cartItems.map((item) => (
            <div key={item.product._id} className="flex justify-between text-sm mb-1">
              <span>
                {item.product.name} x {item.quantity}
              </span>
              <span>₹{item.product.price * item.quantity}</span>
            </div>
          ))}
          <p className="text-right font-bold mt-2">
            Total: ₹
            {cart.cartItems.reduce(
              (acc, item) => acc + item.product.price * item.quantity,
              0
            )}
          </p>
        </div>

        {/* Submit Button */}
        <button
          onClick={placeOrder}
          className="w-full bg-rose-500 text-white py-3 rounded hover:bg-rose-600"
        >
           Place Order
        </button>
      </div>
    </div>
  );
}

export default Checkout;


