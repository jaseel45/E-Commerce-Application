import express from 'express';
import { loginAdmin, getAdminProfile, logoutAdmin } from '../controllers/adminController.js';
import { protect, adminOnly } from '../middleware/authMiddleware.js';

const router = express.Router();

// Admin Login Route 
router.post('/login', loginAdmin);

// Admin Profile Route
// Only accessible for authenticated users with admin role
router.get('/profile', protect, adminOnly, getAdminProfile);

// Admin Logout Route
router.post('/logout', protect, adminOnly, logoutAdmin);

export default router;
