// controllers/message.controller.js
const Message = require('../models/message.model');
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
      receiver: receiver || null,
      group: group || null,
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

// Get messages of a group
exports.getGroupMessages = async (req, res) => {
  try {
    const { group } = req.params;

    const messages = await Message.find({ group }).sort({ createdAt: 1 });

    res.status(200).json(messages);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
