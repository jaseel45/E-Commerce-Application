
import User from '../models/userModel.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

// Generate JWT Token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });
};

// Admin Login
export const loginAdmin = async (req, res) => {
  const { email, password } = req.body;

  // Check if admin exists with the given email and role
  const admin = await User.findOne({ email, role: 'admin' });

  if (admin && (await bcrypt.compare(password, admin.password))) {
    const token = generateToken(admin._id);

    //  Set JWT Token in Cookie
    res.cookie('jwt', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',  
      sameSite: 'strict',
      maxAge: 30 * 24 * 60 * 60 * 1000,  
    });

    res.json({
      _id: admin._id,
      name: admin.name,
      email: admin.email,
      token,
    });
  } else {
    res.status(401).json({ message: 'Invalid admin credentials' });
  }
};

// Admin Profile
export const getAdminProfile = async (req, res) => {
  const admin = await User.findById(req.user.id).select('-password');

  if (admin) {
    res.json(admin);
  } else {
    res.status(404).json({ message: 'Admin not found' });
  }
};


// Admin Logout
export const logoutAdmin = (req, res) => {
  res.clearCookie('jwt', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
  });

  res.status(200).json({ message: 'Admin logged out successfully' });
};


