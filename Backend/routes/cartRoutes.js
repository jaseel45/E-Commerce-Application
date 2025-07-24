import express from 'express';
import {
  addToCart,
  getCartItems,
  updateCartItemQuantity,
  removeFromCart,
  clearCart,
} from '../controllers/cartController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// Add or Update Item in Cart
router.post('/add', protect, addToCart);

// Get Cart Items
router.get('/', protect, getCartItems);

// Update Quantity of a Cart Item
router.put('/:productId', protect, updateCartItemQuantity);

// Remove a Product from Cart
router.delete('/:productId', protect, removeFromCart);

// Clear Entire Cart
router.delete('/', protect, clearCart);

export default router;

