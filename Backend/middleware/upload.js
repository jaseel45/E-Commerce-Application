// middleware/upload.js
import multer from 'multer';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import cloudinary from '../utils/cloudinary.js';

// Dynamically set storage folder and public_id
const storage = new CloudinaryStorage({
  cloudinary,
  params: (req, file) => {
    const isProfileUpload = req.originalUrl.includes('/admin/profile');
    return {
      folder: isProfileUpload ? 'profiles' : 'products',
      allowed_formats: ['jpg', 'jpeg', 'png'],
      public_id: `${Date.now()}-${file.originalname}`,
    };
  },
});

// Initialize multer with cloudinary storage
const upload = multer({ storage });

export default upload;
