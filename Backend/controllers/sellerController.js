import User from '../models/userModel.js';
import Product from '../models/productModel.js';
import Order from '../models/orderModel.js';
import jwt from 'jsonwebtoken';

// Generate JWT Token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });
};

// Seller Signup
export const registerSeller = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'Seller already exists' });
    }

    const seller = await User.create({
      name,
      email,
      password,
      role: 'seller',
    });

    const token = generateToken(seller._id);

    res.cookie('jwt', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
    });

    res.status(201).json({
      _id: seller._id,
      name: seller.name,
      email: seller.email,
      role: seller.role,
      token,
    });
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// Seller Login
export const loginSeller = async (req, res) => {
  const { email, password } = req.body;

  try {
    const seller = await User.findOne({ email });

    if (seller && seller.role === 'seller' && await seller.matchPassword(password)) {
      const token = generateToken(seller._id);

      res.cookie('jwt', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 30 * 24 * 60 * 60 * 1000,
      });

      res.json({
        _id: seller._id,
        name: seller.name,
        email: seller.email,
        role: seller.role,
        message: 'Welcome Seller!',
      });
    } else {
      res.status(401).json({ message: 'Invalid seller credentials' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// Get Seller's Products
export const getMyProducts = async (req, res) => {
  try {
    const products = await Product.find({ seller: req.user._id });
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// Get Orders for Seller's Products
export const getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ 'orderItems.seller': req.user._id });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

//  Get Seller Profile
export const getSellerProfile = async (req, res) => {
  try {
    const seller = await User.findById(req.user._id).select('-password');

    if (!seller || seller.role !== 'seller') {
      return res.status(404).json({ message: 'Seller not found' });
    }

    res.json(seller);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// Update Seller Profile
export const updateSellerProfile = async (req, res) => {
  try {
    const seller = await User.findById(req.user._id);

    if (!seller || seller.role !== 'seller') {
      return res.status(404).json({ message: 'Seller not found' });
    }

    seller.name = req.body.username || seller.name;
    seller.email = req.body.email || seller.email;

    if (req.body.password) {
      seller.password = req.body.password; // hashed in User model pre-save
    }

    const updatedSeller = await seller.save();

    res.json({
      _id: updatedSeller._id,
      name: updatedSeller.name,
      email: updatedSeller.email,
      role: updatedSeller.role,
    });
  } catch (error) {
    res.status(500).json({ message: 'Failed to update profile' });
  }
};
