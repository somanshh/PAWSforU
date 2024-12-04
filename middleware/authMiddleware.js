const jwt = require('jsonwebtoken');
const User = require('../models/User');

const authMiddleware = async (req, res, next) => {
  try {
    const token = req.header('Authorization').replace('Bearer ', '');
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    const user = await User.findOne({ 
      _id: decoded.userId, 
      // Optional: Add token validation if implementing token rotation
    });

    if (!user) {
      throw new Error('Authentication failed');
    }

    req.token = token;
    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({ 
      message: 'Please authenticate',
      error: error.message 
    });
  }
};

const adminMiddleware = (req, res, next) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ 
      message: 'Access denied. Admin rights required.' 
    });
  }
  next();
};

module.exports = { 
  authMiddleware, 
  adminMiddleware 
};