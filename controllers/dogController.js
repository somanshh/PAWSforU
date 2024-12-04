const Dog = require('../models/Dog');

class DogController {
  // Create a new dog listing
  static async createDog(req, res) {
    try {
      const dogData = req.body;
      const dog = new Dog(dogData);
      await dog.save();
      
      res.status(201).json({
        message: 'Dog listing created successfully',
        dog
      });
    } catch (error) {
      res.status(400).json({
        message: 'Failed to create dog listing',
        error: error.message
      });
    }
  }

  // Get all available dogs
  static async getAllDogs(req, res) {
    try {
      const { 
        breed, 
        minAge, 
        maxAge, 
        size, 
        status 
      } = req.query;

      let query = { status: 'Available' };

      if (breed) query.breed = breed;
      if (minAge) query.age = { $gte: parseInt(minAge) };
      if (maxAge) query.age = { ...query.age, $lte: parseInt(maxAge) };
      if (size) query.size = size;
      if (status) query.status = status;

      const dogs = await Dog.find(query);
      
      res.json(dogs);
    } catch (error) {
      res.status(500).json({
        message: 'Error fetching dogs',
        error: error.message
      });
    }
  }

  // Get dog by ID
  static async getDogById(req, res) {
    try {
      const dog = await Dog.findById(req.params.id);
      
      if (!dog) {
        return res.status(404).json({ 
          message: 'Dog not found' 
        });
      }
      
      res.json(dog);
    } catch (error) {
      res.status(500).json({
        message: 'Error fetching dog details',
        error: error.message
      });
    }
  }

  // Update dog listing
  static async updateDog(req, res) {
    try {
      const dog = await Dog.findByIdAndUpdate(
        req.params.id, 
        req.body, 
        { new: true, runValidators: true }
      );
      
      if (!dog) {
        return res.status(404).json({ 
          message: 'Dog not found' 
        });
      }
      
      res.json({
        message: 'Dog listing updated successfully',
        dog
      });
    } catch (error) {
      res.status(400).json({
        message: 'Failed to update dog listing',
        error: error.message
      });
    }
  }

  // Delete dog listing
  static async deleteDog(req, res) {
    try {
      const dog = await Dog.findByIdAndDelete(req.params.id);
      
      if (!dog) {
        return res.status(404).json({ 
          message: 'Dog not found' 
        });
      }
      
      res.json({
        message: 'Dog listing deleted successfully'
      });
    } catch (error) {
      res.status(500).json({
        message: 'Error deleting dog listing',
        error: error.message
      });
    }
  }
}

module.exports = DogController;