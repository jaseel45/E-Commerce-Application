import express from 'express';
import {
  createOrder,
  getMyOrders,
  getOrderById,
  getAllOrders,
  updateOrderStatus,
} from '../controllers/orderController.js';
import { protect, adminOnly } from '../middleware/authMiddleware.js';

const router = express.Router();

// Create New Order (User)
router.post('/', protect, createOrder);

// Get My Orders (User)
router.get('/myorders', protect, getMyOrders);

// Get Single Order by ID (User/Admin)
router.get('/:id', protect, getOrderById);

// Admin: Get All Orders
router.get('/', protect, adminOnly, getAllOrders);

// Admin: Update Order Status (Delivered/Cancelled etc)
router.put('/:id/status', protect, adminOnly, updateOrderStatus);

export default router;
