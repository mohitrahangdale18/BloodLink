const mongoose = require('mongoose');

const donorSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true
  },
  bloodGroup: {
    type: String,
    required: [true, 'Blood group is required'],
    enum: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']
  },
  city: {
    type: String,
    required: [true, 'City is required'],
    trim: true
  },
  isAvailable: {
    type: Boolean,
    default: true
  },
  lastDonated: {
    type: Date
  },
  totalDonations: {
    type: Number,
    default: 0
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Update the updatedAt field before saving
donorSchema.pre('save', function () {
  this.updatedAt = Date.now();
});

module.exports = mongoose.model('Donor', donorSchema);
