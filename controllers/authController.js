const User = require('../models/User');
const jwt = require('jsonwebtoken');

class AuthController {
  static async register(req, res) {
    try {
      const { firstName, lastName, email, password, role } = req.body;

      // Check if user already exists
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ 
          message: 'User already exists' 
        });
      }

      // Create new user
      const user = new User({
        firstName,
        lastName,
        email,
        password,
        role: role || 'user'
      });

      await user.save();

      // Generate JWT token
      const token = jwt.sign(
        { 
          userId: user._id, 
          email: user.email, 
          role: user.role 
        },
        process.env.JWT_SECRET,
        { expiresIn: '24h' }
      );

      res.status(201).json({ 
        message: 'User registered successfully',
        token,
        user: {
          id: user._id,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          role: user.role
        }
      });
    } catch (error) {
      res.status(500).json({ 
        message: 'Registration failed', 
        error: error.message 
      });
    }
  }

  static async login(req, res) {
    try {
      const { email, password } = req.body;

      // Find user by email
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(401).json({ 
          message: 'Invalid login credentials' 
        });
      }

      // Compare passwords
      const isMatch = await user.comparePassword(password);
      if (!isMatch) {
        return res.status(401).json({ 
          message: 'Invalid login credentials' 
        });
      }

      // Generate JWT token
      const token = jwt.sign(
        { 
          userId: user._id, 
          email: user.email, 
          role: user.role 
        },
        process.env.JWT_SECRET,
        { expiresIn: '24h' }
      );

      res.json({
        message: 'Login successful',
        token,
        user: {
          id: user._id,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          role: user.role
        }
      });
    } catch (error) {
      res.status(500).json({ 
        message: 'Login failed', 
        error: error.message 
      });
    }
  }

  static async profile(req, res) {
    try {
      const user = await User.findById(req.user._id)
        .select('-password')
        .populate('adoptionHistory');
      
      res.json(user);
    } catch (error) {
      res.status(500).json({ 
        message: 'Could not retrieve profile', 
        error: error.message 
      });
    }
  }

  static async updateProfile(req, res) {
    try {
      const { firstName, lastName, address, phoneNumber } = req.body;
      
      const user = await User.findByIdAndUpdate(
        req.user._id,
        { 
          firstName, 
          lastName, 
          address, 
          phoneNumber 
        },
        { new: true, runValidators: true }
      ).select('-password');

      res.json(user);
    } catch (error) {
      res.status(400).json({ 
        message: 'Profile update failed', 
        error: error.message 
      });
    }
  }
}

module.exports = AuthController;