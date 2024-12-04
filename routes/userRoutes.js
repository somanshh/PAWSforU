const express = require('express');
const UserController = require('../controllers/userController');
const { 
  authMiddleware, 
  adminMiddleware 
} = require('../middleware/authMiddleware');

const router = express.Router();

// Admin routes
router.get('/', 
  authMiddleware, 
  adminMiddleware, 
  UserController.getAllUsers
);

// Get specific user (admin or self)
router.get('/:id', 
  authMiddleware, 
  (req, res, next) => {
    // Allow admin or self to access
    if (req.user.role === 'admin' || req.user._id.toString() === req.params.id) {
      next();
    } else {
      res.status(403).json({ message: 'Unauthorized access' });
    }
  }, 
  UserController.getUserById
);

// Update user status (admin only)
router.put('/:id/status', 
  authMiddleware, 
  adminMiddleware, 
  UserController.updateUserStatus
);

// Get user's adoption history
router.get('/adoptions/history', 
  authMiddleware, 
  UserController.getUserAdoptionHistory
);

module.exports = router;