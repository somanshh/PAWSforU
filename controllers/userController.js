const User = require('../models/User');
const Adoption = require('../models/Adoption');

class UserController {
  // Get all users (admin only)
  static async getAllUsers(req, res) {
    try {
      const users = await User.find()
        .select('-password')
        .populate('adoptionHistory');
      
      res.json(users);
    } catch (error) {
      res.status(500).json({ 
        message: 'Error fetching users', 
        error: error.message 
      });
    }
  }

  // Get user by ID
  static async getUserById(req, res) {
    try {
      const user = await User.findById(req.params.id)
        .select('-password')
        .populate('adoptionHistory');
      
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      
      res.json(user);
    } catch (error) {
      res.status(500).json({ 
        message: 'Error fetching user', 
        error: error.message 
      });
    }
  }

  // Update user status (admin)
  static async updateUserStatus(req, res) {
    try {
      const { status } = req.body;
      
      const user = await User.findByIdAndUpdate(
        req.params.id,
        { status },
        { new: true, runValidators: true }
      ).select('-password');

      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      res.json(user);
    } catch (error) {
      res.status(400).json({ 
        message: 'User update failed', 
        error: error.message 
      });
    }
  }

  // Get user's adoption history
  static async getUserAdoptionHistory(req, res) {
    try {
      const adoptions = await Adoption.find({ user: req.user._id })
        .populate('dog')
        .sort({ createdAt: -1 });
      
      res.json(adoptions);
    } catch (error) {
      res.status(500).json({ 
        message: 'Error fetching adoption history', 
        error: error.message 
      });
    }
  }
}

module.exports = UserController;