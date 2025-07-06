import express from 'express';

// Import individual route files
import userRoutes from './userRoutes.js';
import adminRoutes from './adminRoutes.js';
import productRoutes from './productRoutes.js';
import orderRoutes from './orderRoutes.js';
import cartRoutes from './cartRoutes.js';
import sellerRoutes from './sellerRoutes.js';
import reviewRoutes from './reviewRoutes.js';
import uploadRoutes from './uploadRoute.js';

const router = express.Router();

// Central route mapping
router.use('/users', userRoutes);
router.use('/admin', adminRoutes);
router.use('/products', productRoutes);
router.use('/orders', orderRoutes);
router.use('/cart', cartRoutes);
router.use('/seller', sellerRoutes);
router.use('/reviews', reviewRoutes);
router.use('/upload', uploadRoutes);  

export default router;
