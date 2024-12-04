const express = require('express');
const AdoptionController = require('../controllers/adoptionController');
const { authMiddleware, adminMiddleware } = require('../middleware/authMiddleware');

const router = express.Router();

// User Routes
router.post('/', authMiddleware, AdoptionController.submitApplication);
router.get('/my-applications', authMiddleware, AdoptionController.getUserApplications);

// Admin Routes
router.get('/', authMiddleware, adminMiddleware, AdoptionController.getAllApplications);
router.put('/:id', authMiddleware, adminMiddleware, AdoptionController.updateApplicationStatus);

module.exports = router;