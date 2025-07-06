import Product from '../models/productModel.js';
import Order from '../models/orderModel.js';

// Get All Products Listed by Current Seller
export const getMyProducts = async (req, res) => {
  try {
    const products = await Product.find({ seller: req.user._id });
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// Get All Orders Related to Seller's Products
export const getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ 'orderItems.seller': req.user._id });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};
