import express from 'express';
import {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
  getSellerProducts, // 
} from '../controllers/productController.js';
import { protect } from '../middleware/authMiddleware.js';
import { checkRole } from '../middleware/roleMiddleware.js';

const router = express.Router();

//  Seller’s Own Products
router.get('/mine', protect, checkRole(['seller']), getSellerProducts);

// Create Product (Only Sellers/Admins)
router.post('/', protect, checkRole(['seller', 'admin']), createProduct);

// Get All Products (Public)
router.get('/', getAllProducts);

// Get Product By ID (Public)
router.get('/:id', getProductById);

// Update Product (Only Sellers/Admins)
router.put('/:id', protect, checkRole(['seller', 'admin']), updateProduct);

// Delete Product (Only Sellers/Admins)
router.delete('/:id', protect, checkRole(['seller', 'admin']), deleteProduct);

export default router;
