import express from 'express';
import {
  registerUser,
  loginUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
  deleteUser,
  checkUserRole,
  forgotPassword,
  resetPassword
} from '../controllers/userController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// Signup
router.post('/signup', registerUser);

// Login
router.post('/login', loginUser);

// Logout
router.post('/logout', protect, logoutUser);

// Get Profile
router.get('/profile', protect, getUserProfile);

// Update Profile
router.put('/profile', protect, updateUserProfile);

// Delete User
router.delete('/delete', protect, deleteUser);

// Check User Role 
router.get('/check-role', protect, checkUserRole);

// Forgot Password
router.post('/forgot-password', forgotPassword);

// Reset Password
router.post('/reset-password/:token', resetPassword);



export default router;


