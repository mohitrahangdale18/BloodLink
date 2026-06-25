const User = require('../models/User');
const jwt = require('jsonwebtoken');

// Helper to generate token
const generateToken = (user) => {
  return jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: '30d' }
  );
};

// @desc    Register a new user
// @route   POST /api/auth/register
// @access  Public
exports.register = async (req, res, next) => {
  try {
    const { name, email, password, bloodGroup, city, phone, role } = req.body;

    // Validate inputs
    if (!name || !email || !password || !bloodGroup || !city || !phone) {
      return res.status(400).json({
        success: false,
        message: 'All fields (name, email, password, bloodGroup, city, phone) are required'
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

    const newUser = new User({
      name,
      email,
      password,
      bloodGroup,
      city,
      phone,
      role: role || 'donor'
    });

    await newUser.save();

    const token = generateToken(newUser);

    res.status(201).json({
      success: true,
      data: {
        token,
        user: {
          id: newUser._id,
          name: newUser.name,
          email: newUser.email,
          bloodGroup: newUser.bloodGroup,
          city: newUser.city,
          phone: newUser.phone,
          role: newUser.role,
          createdAt: newUser.createdAt
        }
      }
    });
  } catch (error) {
    // Handle duplicate email unique constraint error
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: 'Email already registered'
      });
    }
    next(error);
  }
};

// @desc    Authenticate user & get token
// @route   POST /api/auth/login
// @access  Public
exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Please provide email and password'
      });
    }

    // Find user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials'
      });
    }

    // Check if password matches
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials'
      });
    }

    const token = generateToken(user);

    res.status(200).json({
      success: true,
      data: {
        token,
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          bloodGroup: user.bloodGroup,
          city: user.city,
          phone: user.phone,
          role: user.role,
          createdAt: user.createdAt
        }
      }
    });
  } catch (error) {
    next(error);
  }
};
