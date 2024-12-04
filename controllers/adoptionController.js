const Adoption = require('../models/Adoption');
const Dog = require('../models/Dog');

class AdoptionController {
  // Submit adoption application
  static async submitApplication(req, res) {
    try {
      const { dogId } = req.body;
      const userId = req.user._id;

      // Check if dog exists and is available
      const dog = await Dog.findById(dogId);
      if (!dog || dog.status !== 'Available') {
        return res.status(400).json({ 
          message: 'Dog is not available for adoption' 
        });
      }

      // Check if user has already applied for this dog
      const existingApplication = await Adoption.findOne({ 
        dog: dogId, 
        user: userId,
        status: { $in: ['Pending', 'Approved'] }
      });

      if (existingApplication) {
        return res.status(400).json({ 
          message: 'You have already applied for this dog' 
        });
      }

      // Create adoption application
      const adoption = new Adoption({
        dog: dogId,
        user: userId,
        status: 'Pending'
      });

      await adoption.save();

      // Update dog status to pending
      dog.status = 'Pending';
      await dog.save();

      res.status(201).json({
        message: 'Adoption application submitted successfully',
        adoption
      });
    } catch (error) {
      res.status(500).json({
        message: 'Failed to submit adoption application',
        error: error.message
      });
    }
  }

  // Get user's adoption applications
  static async getUserApplications(req, res) {
    try {
      const applications = await Adoption.find({ user: req.user._id })
        .populate('dog')
        .sort({ createdAt: -1 });
      
      res.json(applications);
    } catch (error) {
      res.status(500).json({
        message: 'Error fetching adoption applications',
        error: error.message
      });
    }
  }

  // Admin: Get all adoption applications
  static async getAllApplications(req, res) {
    try {
      const { status } = req.query;
      const query = status ? { status } : {};

      const applications = await Adoption.find(query)
        .populate('dog')
        .populate('user')
        .sort({ createdAt: -1 });
      
      res.json(applications);
    } catch (error) {
      res.status(500).json({
        message: 'Error fetching adoption applications',
        error: error.message
      });
    }
  }

  // Admin: Update adoption application status
  static async updateApplicationStatus(req, res) {
    try {
      const { status, notes } = req.body;
      const application = await Adoption.findByIdAndUpdate(
        req.params.id, 
        { 
          status, 
          additionalNotes: notes 
        },
        { new: true }
      ).populate('dog');

      // Update dog status based on application
      if (application.dog) {
        application.dog.status = status === 'Approved' 
          ? 'Adopted' 
          : 'Available';
        await application.dog.save();
      }

      res.json({
        message: 'Adoption application updated successfully',
        application
      });
    } catch (error) {
      res.status(500).json({
        message: 'Failed to update adoption application',
        error: error.message
      });
    }
  }
}

module.exports = AdoptionController;