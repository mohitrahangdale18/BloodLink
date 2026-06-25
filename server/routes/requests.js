const express = require('express');
const router = express.Router();
const protect = require('../middleware/auth');
const {
  createRequest,
  getRequests,
  getRequestById,
  updateStatus
} = require('../controllers/requestController');

// Apply auth middleware to protect all endpoints below
router.use(protect);

// @route   POST /api/requests
router.post('/', createRequest);

// @route   GET /api/requests
router.get('/', getRequests);

// @route   GET /api/requests/:id
router.get('/:id', getRequestById);

// @route   PATCH /api/requests/:id/status
router.patch('/:id/status', updateStatus);

module.exports = router;
