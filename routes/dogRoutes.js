const express = require('express');
const DogController = require('../controllers/dogController');
const { authMiddleware, adminMiddleware } = require('../middleware/authMiddleware');

const router = express.Router();

// Public Routes
router.get('/', DogController.getAllDogs);
router.get('/:id', DogController.getDogById);

// Protected Admin Routes
router.post('/', authMiddleware, adminMiddleware, DogController.createDog);
router.put('/:id', authMiddleware, adminMiddleware, DogController.updateDog);
router.delete('/:id', authMiddleware, adminMiddleware, DogController.deleteDog);

module.exports = router;