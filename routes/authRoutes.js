const express = require('express');
const AuthController = require('../controllers/authController');
const { authMiddleware } = require('../middleware/authMiddleware');

const router = express.Router();

// Public Routes
router.post('/register', AuthController.register);
router.post('/login', AuthController.login);

// Protected Routes
router.get('/profile', authMiddleware, AuthController.profile);
router.put('/profile', authMiddleware, AuthController.updateProfile);

module.exports = router;