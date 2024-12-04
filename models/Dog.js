const mongoose = require('mongoose');

const DogSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  breed: {
    type: String,
    required: true
  },
  age: {
    type: Number,
    required: true
  },
  gender: {
    type: String,
    enum: ['Male', 'Female'],
    required: true
  },
  size: {
    type: String,
    enum: ['Small', 'Medium', 'Large'],
    required: true
  },
  description: {
    type: String,
    required: true
  },
  medicalHistory: String,
  temperament: [String],
  images: [String],
  status: {
    type: String,
    enum: ['Available', 'Pending', 'Adopted'],
    default: 'Available'
  },
  shelterLocation: {
    type: String,
    required: true
  },
  specialNeeds: Boolean,
  adoptionFee: {
    type: Number,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Dog', DogSchema);