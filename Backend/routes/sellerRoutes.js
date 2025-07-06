import express from 'express';
import {
  getMyProducts,
  getMyOrders,
} from '../controllers/sellerController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// Get All Products Listed by Seller
router.get('/products', protect, getMyProducts);

// Get All Orders for Seller's Products
router.get('/orders', protect, getMyOrders);

export default router;
