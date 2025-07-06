import express from 'express';
import {
  addToCart,
  getCartItems,
  removeFromCart,
  clearCart,
} from '../controllers/cartController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// Add Item to Cart
router.post('/add', protect, addToCart);

// Get User Cart Items
router.get('/', protect, getCartItems);

// Remove Item from Cart
router.delete('/:productId', protect, removeFromCart);

// Clear Entire Cart
router.delete('/', protect, clearCart);

export default router;
