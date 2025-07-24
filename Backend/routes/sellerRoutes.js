import express from 'express';
import {
  registerSeller,
  loginSeller,
  getMyProducts,
  getMyOrders,
  getSellerProfile,      
  updateSellerProfile    
} from '../controllers/sellerController.js';

import { protect } from '../middleware/authMiddleware.js';
import { checkRole } from '../middleware/roleMiddleware.js'; 

const router = express.Router();

router.post('/signup', registerSeller);
router.post('/login', loginSeller);

// 🔒 Protect and check role
router.get('/products', protect, checkRole(['seller']), getMyProducts);
router.get('/orders', protect, checkRole(['seller']), getMyOrders);

// ✅ NEW: Seller profile routes
router.get('/profile', protect, checkRole(['seller']), getSellerProfile);
router.put('/profile', protect, checkRole(['seller']), updateSellerProfile);

export default router;







// import express from 'express';
// import {
//   registerSeller,
//   getMyProducts,
//   getMyOrders,
// } from '../controllers/sellerController.js'; 

// import { protect } from '../middleware/authMiddleware.js';

// const router = express.Router();

// //  Seller Signup Route
// router.post('/signup', registerSeller);

// // Get All Products Listed by Seller
// router.get('/products', protect, getMyProducts);

// // Get All Orders for Seller's Products
// router.get('/orders', protect, getMyOrders);

// export default router;




// import express from 'express';
// import {
//   getMyProducts,
//   getMyOrders,
// } from '../controllers/sellerController.js';
// import { protect } from '../middleware/authMiddleware.js';

// const router = express.Router();

// // Get All Products Listed by Seller
// router.get('/products', protect, getMyProducts);

// // Get All Orders for Seller's Products
// router.get('/orders', protect, getMyOrders);

// export default router;



