
import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Home from './pages/Home';
import Login from './pages/Login';
import ForgotPassword from './pages/ForgotPassword';
import Register from './pages/Register';
import SellerRegister from './pages/SellerRegister';

import UserDashboard from './pages/UserDashboard';
import SellerDashboard from './pages/SellerDashboard';
import AdminDashboard from './pages/AdminDashboard';

import ProtectedRoute from './components/ProtectedRoute';

import Products from './pages/Products';
import ProductDetail from './pages/ProductDetail';
import CartPage from './pages/Cart';
import Checkout from './pages/Checkout';
import UserOrders from './pages/UserOrders';

import SellerProducts from './pages/SellerProducts';
import AddProduct from './pages/AddProduct';
import EditProduct from './pages/EditProduct';
import SellerOrders from './pages/SellerOrders';


function App() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/seller-register" element={<SellerRegister />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/products" element={<Products />} />
      <Route path="/products/:id" element={<ProductDetail />} />

      {/* Protected Routes: User */}
      <Route
        path="/user-dashboard"
        element={
          <ProtectedRoute allowedRoles={['user', 'buyer']}>
            <UserDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/cart"
        element={
          <ProtectedRoute allowedRoles={['user', 'buyer']}>
            <CartPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/checkout"
        element={
          <ProtectedRoute allowedRoles={['user', 'buyer']}>
            <Checkout />
          </ProtectedRoute>
        }
      />
      <Route
        path="/user-orders"
        element={
          <ProtectedRoute allowedRoles={['user', 'buyer']}>
            <UserOrders />
          </ProtectedRoute>
        }
      />

      {/* Protected Routes: Seller */}
      <Route
        path="/seller-dashboard"
        element={
          <ProtectedRoute allowedRoles={['seller']}>
            <SellerDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/seller-products"
        element={
          <ProtectedRoute allowedRoles={['seller']}>
            <SellerProducts />
          </ProtectedRoute>
        }
      />
      <Route
        path="/add-product"
        element={
          <ProtectedRoute allowedRoles={['seller']}>
            <AddProduct />
          </ProtectedRoute>
        }
      />
      <Route
        path="/edit-product/:id"
        element={
          <ProtectedRoute allowedRoles={['seller']}>
            <EditProduct />
          </ProtectedRoute>
        }
      />
      <Route
        path="/seller-orders"
        element={
          <ProtectedRoute allowedRoles={['seller']}>
            <SellerOrders />
          </ProtectedRoute>
        }
      />

      {/* Protected Routes: Admin */}
      <Route
        path="/admin-dashboard"
        element={
          <ProtectedRoute allowedRoles={['admin']}>
            <AdminDashboard />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default App;
