// controllers/message.controller.js
const Message = require('../models/onetoone.model');
const User = require('../models/user.model');

// Send a message (direct or group)
exports.sendMessage = async (req, res) => {
  try {
    const { sender, receiver, group, text } = req.body;

    if (!text || (!receiver && !group)) {
      return res.status(400).json({ error: 'Text and receiver/group are required' });
    }

    const message = new Message({
      sender,
      receiver: receiver,
      group: group ,
      text,
    });

    await message.save();
    res.status(201).json(message);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get one-to-one messages between two users
exports.getMessages = async (req, res) => {
  try {
    const { user1, user2 } = req.query;

    const messages = await Message.find({
      $or: [
        { sender: user1, receiver: user2 },
        { sender: user2, receiver: user1 },
      ],
    }).sort({ createdAt: 1 });

    res.status(200).json(messages);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get all user whom i started  chat
exports.getChattedUsers = async (req, res) => {
  try {
    const { userId } = req.query;

    if (!userId) return res.status(400).json({ error: 'User ID is required' });

    // Find distinct user IDs the current user has chatted with
    const sentMessages = await Message.find({ sender: userId, receiver: { $ne: null } }).distinct('receiver');
    const receivedMessages = await Message.find({ receiver: userId }).distinct('sender');

    // Merge and remove duplicates
    const uniqueUserIds = [...new Set([...sentMessages, ...receivedMessages])];

    // Populate user details if needed
    const users = await User.find({ _id: { $in: uniqueUserIds } }).select('_id username email');

    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

