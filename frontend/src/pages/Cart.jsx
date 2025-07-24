// src/pages/Cart.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import API from '../api/axiosConfig';

function Cart() {
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const res = await API.get('/api/cart', {
          withCredentials: true,
        });
        setCart(res.data);
      } catch (err) {
        setError('Failed to load cart');
      } finally {
        setLoading(false);
      }
    };

    fetchCart();
  }, []);

  const handleRemove = async (productId) => {
  try {
    await API.delete(`/api/cart/${productId}`, {
      withCredentials: true,
    });

    // Safely update frontend state
    setCart((prev) => ({
      ...prev,
      cartItems: prev.cartItems.filter((item) => item.product._id !== productId),
    }));
  } catch {
    alert('Failed to remove item');
  }
};


  const updateQuantity = async (productId, newQuantity) => {
    if (newQuantity < 1) return;

    try {
      const res = await API.put(
        `/api/cart/${productId}`,
        { quantity: newQuantity },
        { withCredentials: true }
      );
      setCart(res.data);
    } catch (err) {
      console.log(err)
      alert('Failed to update quantity');
    }
  };

  const getTotal = () => {
    return cart.cartItems.reduce(
      (sum, item) => sum + item.quantity * item.product.price,
      0
    );
  };

  if (loading) return <div className="text-center mt-10 text-gray-600">Loading cart...</div>;
  if (error) return <div className="text-center mt-10 text-red-500">{error}</div>;
  if (!cart || cart.cartItems.length === 0)
    return (
      <div className="text-center mt-10 text-gray-500">
        Your cart is empty  <br />
        <Link to="/products" className="text-rose-600 underline mt-4 inline-block">
           Add Products
        </Link>
      </div>
    );

  return (
    <div className="min-h-screen bg-pink-50 py-10 px-4">
      <h1 className="text-3xl font-bold text-center text-rose-600 mb-6"> Your Cart</h1>

      <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow space-y-4">
        {cart.cartItems.map((item) => (
          <div
            key={item.product._id}
            className="flex items-center justify-between border-b pb-4"
          >
            <div className="flex items-center space-x-4">
              <img
                src={item.product.images[0]}
                alt={item.product.name}
                className="w-20 h-20 object-cover rounded"
              />
              <div>
                <h2 className="font-bold text-lg text-rose-700">{item.product.name}</h2>
                <p className="text-gray-600 text-sm">₹{item.product.price}</p>
                <div className="flex items-center space-x-2 mt-1">
                  {/* <button
                    onClick={() => updateQuantity(item.product._id, item.quantity - 1)}
                    className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
                  >
                    −
                  </button> */}
                  <span>Quantity: {item.quantity}</span>
                  {/* <button
                    onClick={() => updateQuantity(item.product._id, item.quantity + 1)}
                    className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
                  >
                    +
                  </button> */}
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <p className="font-semibold text-gray-700">
                ₹{item.product.price * item.quantity}
              </p>
              <button
                onClick={() => handleRemove(item.product._id)}
                className="flex items-center gap-1 text-white bg-red-500 hover:bg-red-600 px-3 py-1.5 rounded-full shadow-sm transition-all duration-200 text-sm"
              >
                 <span>Remove</span>
              </button>
            </div>
          </div>
        ))}

        {/* Total */}
        <div className="text-right text-xl font-bold text-rose-700 pt-4">
          Total: ₹{getTotal()}
        </div>

        {/* Buttons */}
        <div className="flex justify-between mt-6">
          <Link
            to="/products"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-green-400 to-green-600 text-white font-semibold px-5 py-2 rounded-full shadow-md hover:from-green-500 hover:to-green-700 transition duration-300"
          >
            <span className="text-xl"></span> Continue Shopping
          </Link>
          <button
            className="bg-rose-500 text-white px-6 py-2 rounded hover:bg-rose-600"
            onClick={() => navigate('/checkout')}
          >
             Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  );
}

export default Cart;
