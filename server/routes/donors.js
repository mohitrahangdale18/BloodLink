const express = require('express');
const router = express.Router();
const protect = require('../middleware/auth');
const {
  getProfile,
  createProfile,
  updateProfile,
  toggleAvailability,
  searchDonors
} = require('../controllers/donorController');

// Apply auth middleware to protect all endpoints below
router.use(protect);

// @route   GET /api/donors/profile
router.get('/profile', getProfile);

// @route   POST /api/donors/profile
router.post('/profile', createProfile);

// @route   PUT /api/donors/profile
router.put('/profile', updateProfile);

// @route   PATCH /api/donors/availability
router.patch('/availability', toggleAvailability);

// @route   GET /api/donors/search
router.get('/search', searchDonors);

module.exports = router;
