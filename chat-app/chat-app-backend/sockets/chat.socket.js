const Message = require('../models/message.model');
const Group = require('../models/group.model'); // assuming you have this

const activeUsers = new Map(); // userId -> socketId

module.exports = (io) => {
  io.on('connection', (socket) => {
    console.log('New client connected:', socket.id);

    // Register user
    socket.on('register', (userId) => {
      activeUsers.set(userId, socket.id);
      console.log(`User ${userId} registered with socket ${socket.id}`);
    });

    // One-to-one message
    socket.on('private_message', async (data) => {
      const { sender, receiver, text } = data;

      const message = new Message({ sender, receiver, text });
      await message.save();

      const receiverSocketId = activeUsers.get(receiver);
      if (receiverSocketId) {
        io.to(receiverSocketId).emit('receive_private_message', message);
      }
    });

    // Group message
    socket.on('group_message', async (data) => {
      const { sender, groupId, text } = data;

      try {
        const group = await Group.findById(groupId);
        if (!group) return console.error('Group not found');

        const message = new Message({
          sender,
          group: groupId,
          text,
        });

        await message.save();

        // Emit to all group members (who are online)
        for (const memberId of group.members) {
          const memberSocketId = activeUsers.get(memberId.toString());
          if (memberSocketId) {
            io.to(memberSocketId).emit(`receive_group_message_${groupId}`, message);
          }
        }
      } catch (err) {
        console.error('Error in group_message:', err);
      }
    });

    // Disconnect
    socket.on('disconnect', () => {
      console.log('Client disconnected:', socket.id);
      for (const [userId, sockId] of activeUsers.entries()) {
        if (sockId === socket.id) {
          activeUsers.delete(userId);
          break;
        }
      }
    });
  });
};
