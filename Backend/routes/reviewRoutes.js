import express from 'express';
import { protect } from '../middleware/authMiddleware.js';
import {
  createReview,
  getProductReviews,
  deleteReview,
} from '../controllers/reviewController.js';

const router = express.Router();

// Create a Review (Logged-in users only)
router.post('/:productId', protect, createReview);

// Get All Reviews for a Product (Public)
router.get('/:productId', getProductReviews);

// Delete a Review (Owner or Admin)
router.delete('/:reviewId', protect, deleteReview);

export default router;
