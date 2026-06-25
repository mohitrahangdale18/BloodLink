const User = require('../models/User');
const Donor = require('../models/Donor');

// Blood Compatibility Map (Inverted: Recipient Blood Group -> Allowed Donor Blood Groups)
const COMPATIBILITY_MAP = {
  'A+': ['A+', 'A-', 'O+', 'O-'],
  'A-': ['A-', 'O-'],
  'B+': ['B+', 'B-', 'O+', 'O-'],
  'B-': ['B-', 'O-'],
  'AB+': ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
  'AB-': ['A-', 'B-', 'AB-', 'O-'],
  'O+': ['O+', 'O-'],
  'O-': ['O-']
};

// @desc    Get donor profile of logged-in user
// @route   GET /api/donors/profile
// @access  Private
exports.getProfile = async (req, res, next) => {
  try {
    const donor = await Donor.findOne({ userId: req.user.id });
    res.status(200).json({
      success: true,
      data: donor
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Create donor profile for logged-in user
// @route   POST /api/donors/profile
// @access  Private
exports.createProfile = async (req, res, next) => {
  try {
    const userId = req.user.id;

    // Check if donor profile already exists
    let donor = await Donor.findOne({ userId });
    if (donor) {
      return res.status(400).json({
        success: false,
        message: 'Donor profile already exists for this user'
      });
    }

    // Fetch user details to get defaults
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'Associated user not found'
      });
    }

    const {
      bloodGroup,
      city,
      isAvailable,
      lastDonated,
      totalDonations
    } = req.body;

    donor = new Donor({
      userId,
      bloodGroup: bloodGroup || user.bloodGroup,
      city: city || user.city,
      isAvailable: isAvailable !== undefined ? isAvailable : true,
      lastDonated: lastDonated || null,
      totalDonations: totalDonations || 0
    });

    await donor.save();

    res.status(201).json({
      success: true,
      data: donor
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update donor profile for logged-in user
// @route   PUT /api/donors/profile
// @access  Private
exports.updateProfile = async (req, res, next) => {
  try {
    const userId = req.user.id;

    let donor = await Donor.findOne({ userId });
    if (!donor) {
      return res.status(404).json({
        success: false,
        message: 'Donor profile not found. Please create a profile first.'
      });
    }

    const {
      bloodGroup,
      city,
      isAvailable,
      lastDonated,
      totalDonations
    } = req.body;

    if (bloodGroup) donor.bloodGroup = bloodGroup;
    if (city) donor.city = city;
    if (isAvailable !== undefined) donor.isAvailable = isAvailable;
    if (lastDonated !== undefined) donor.lastDonated = lastDonated;
    if (totalDonations !== undefined) donor.totalDonations = totalDonations;

    await donor.save();

    res.status(200).json({
      success: true,
      data: donor
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Toggle isAvailable availability status
// @route   PATCH /api/donors/availability
// @access  Private
exports.toggleAvailability = async (req, res, next) => {
  try {
    const userId = req.user.id;

    const donor = await Donor.findOne({ userId });
    if (!donor) {
      return res.status(404).json({
        success: false,
        message: 'Donor profile not found'
      });
    }

    donor.isAvailable = !donor.isAvailable;
    await donor.save();

    res.status(200).json({
      success: true,
      data: donor
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Search available compatible donors by blood group and/or city
// @route   GET /api/donors/search
// @access  Private
exports.searchDonors = async (req, res, next) => {
  try {
    const { bloodGroup, city } = req.query;

    const query = { isAvailable: true };

    if (bloodGroup) {
      const upperGroup = bloodGroup.toUpperCase();
      const compatibleGroups = COMPATIBILITY_MAP[upperGroup];
      if (compatibleGroups) {
        query.bloodGroup = { $in: compatibleGroups };
      } else {
        query.bloodGroup = upperGroup; // Fallback to exact match if not in map
      }
    }

    if (city) {
      query.city = { $regex: new RegExp(city.trim(), 'i') };
    }

    const donors = await Donor.find(query)
      .populate('userId', 'name email phone')
      .exec();

    res.status(200).json({
      success: true,
      data: donors
    });
  } catch (error) {
    next(error);
  }
};
