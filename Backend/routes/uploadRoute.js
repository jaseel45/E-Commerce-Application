// routes/uploadRoute.js
import express from 'express';
import { upload } from '../config/cloudinary.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();  //

router.post('/', protect, upload.single('image'), (req, res) => {
  res.status(201).json({ imageUrl: req.file.path });
});

export default router;


