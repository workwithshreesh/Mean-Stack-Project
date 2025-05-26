// controllers/user.controller.js
const User = require('../models/user.model');

// Search users by username
exports.searchUsers = async (req, res) => {
  try {
    const { username } = req.query;

    // Don't return password field
    const users = await User.find({
      username: { $regex: username, $options: 'i' } 
    }).select('-password');

    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// (Optional) Get user by ID
exports.getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-password');
    if (!user) return res.status(404).json({ error: 'User not found' });

    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
