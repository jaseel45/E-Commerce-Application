import express from 'express';
import {
  loginAdmin,
  getAdminProfile,
  updateAdminProfile,
  logoutAdmin,
  getAllUsers,
  deleteUser,
} from '../controllers/adminController.js';

import { protect, adminOnly } from '../middleware/authMiddleware.js'; 


const router = express.Router();

// Admin Authentication
router.post('/login', loginAdmin);
router.post('/logout', logoutAdmin);

router.get('/profile', protect, adminOnly, getAdminProfile);
router.put('/profile', protect, adminOnly, updateAdminProfile);

// Admin - Manage Users
router.get('/users', protect, adminOnly, getAllUsers);
router.delete('/users/:id', protect, adminOnly, deleteUser);

export default router;





