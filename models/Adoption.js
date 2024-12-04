const mongoose = require('mongoose');

const AdoptionSchema = new mongoose.Schema({
  dog: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Dog',
    required: true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  status: {
    type: String,
    enum: ['Pending', 'Approved', 'Rejected', 'Completed'],
    default: 'Pending'
  },
  applicationDate: {
    type: Date,
    default: Date.now
  },
  homeCheckStatus: {
    type: String,
    enum: ['Pending', 'Passed', 'Failed'],
    default: 'Pending'
  },
  additionalNotes: String,
  interviewScheduled: Date,
  adoptionCompletedDate: Date
}, {
  timestamps: true
});

module.exports = mongoose.model('Adoption', AdoptionSchema);