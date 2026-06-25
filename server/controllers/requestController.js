const BloodRequest = require('../models/BloodRequest');

// @desc    Create a new blood request
// @route   POST /api/requests
// @access  Private
exports.createRequest = async (req, res, next) => {
  try {
    const { bloodGroup, city, hospital, contactNumber, urgency } = req.body;

    // Validate input fields
    if (!bloodGroup || !city || !hospital || !contactNumber || !urgency) {
      return res.status(400).json({
        success: false,
        message: 'All fields (bloodGroup, city, hospital, contactNumber, urgency) are required'
      });
    }

    // Validate blood group format
    const validBloodGroups = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];
    if (!validBloodGroups.includes(bloodGroup)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid blood group. Must be one of: A+, A-, B+, B-, AB+, AB-, O+, O-'
      });
    }

    // Validate urgency level
    const validUrgencies = ['normal', 'urgent', 'critical'];
    if (!validUrgencies.includes(urgency)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid urgency. Must be one of: normal, urgent, critical'
      });
    }

    const bloodRequest = new BloodRequest({
      requestedBy: req.user.id,
      bloodGroup,
      city,
      hospital,
      contactNumber,
      urgency
    });

    await bloodRequest.save();

    res.status(201).json({
      success: true,
      data: bloodRequest
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get all blood requests with filters
// @route   GET /api/requests
// @access  Private
exports.getRequests = async (req, res, next) => {
  try {
    const { status, bloodGroup, city } = req.query;

    const query = {};

    if (status) {
      query.status = status;
    }
    if (bloodGroup) {
      query.bloodGroup = bloodGroup.toUpperCase();
    }
    if (city) {
      query.city = { $regex: new RegExp(city.trim(), 'i') };
    }

    const requests = await BloodRequest.find(query)
      .populate('requestedBy', 'name email phone')
      .sort({ createdAt: -1 })
      .exec();

    res.status(200).json({
      success: true,
      data: requests
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single request details by ID
// @route   GET /api/requests/:id
// @access  Private
exports.getRequestById = async (req, res, next) => {
  try {
    const request = await BloodRequest.findById(req.params.id)
      .populate('requestedBy', 'name email phone')
      .exec();

    if (!request) {
      return res.status(404).json({
        success: false,
        message: 'Blood request not found'
      });
    }

    res.status(200).json({
      success: true,
      data: request
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update blood request status
// @route   PATCH /api/requests/:id/status
// @access  Private
exports.updateStatus = async (req, res, next) => {
  try {
    const { status } = req.body;

    if (!status) {
      return res.status(400).json({
        success: false,
        message: 'Please provide status'
      });
    }

    const validStatuses = ['pending', 'fulfilled', 'cancelled'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid status. Must be one of: pending, fulfilled, cancelled'
      });
    }

    const request = await BloodRequest.findById(req.params.id);
    if (!request) {
      return res.status(404).json({
        success: false,
        message: 'Blood request not found'
      });
    }

    // Authorization check: only requester can update status
    if (request.requestedBy.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to update the status of this request'
      });
    }

    request.status = status;
    await request.save();

    res.status(200).json({
      success: true,
      data: request
    });
  } catch (error) {
    next(error);
  }
};
