const Message = require('../models/onetoone.model');
const Group = require('../models/group.model');
const User = require('../models/user.model');

const activeUsers = new Map(); // userId -> socketId

module.exports = (io) => {
  io.on('connection', (socket) => {
    console.log(`✅ New client connected: ${socket.id}`);

    // Register the user and their socket
    socket.on('register', (userId) => {
      activeUsers.set(userId, socket.id);
      console.log(`User ${userId} registered with socket ${socket.id}`);
    });

    /**
     * One-to-One Messaging
     */
    socket.on('private_message', async ({ sender, receiver, text }) => {
      try {
        const message = new Message({ sender, receiver, text });
        await message.save();

        const receiverSocketId = activeUsers.get(receiver);
        if (receiverSocketId) {
          io.to(receiverSocketId).emit('receive_private_message', message);
        }
      } catch (err) {
        console.error('private_message error:', err.message);
        socket.emit('error', 'Server error during private messaging.');
      }
    });

    /**
     * Get Chat List for One-to-One
     */
    socket.on('chat-started', async (userId) => {
      try {
        const sent = await Message.find({ sender: userId }).distinct('receiver');
        const received = await Message.find({ receiver: userId }).distinct('sender');
        const allUserIds = [...new Set([...sent, ...received])];

        const users = await User.find({ _id: { $in: allUserIds } }).select('_id username');
        socket.emit('chat-list', users);
      } catch (err) {
        console.error('chat-started error:', err.message);
        socket.emit('error', 'Failed to fetch chat list.');
      }
    });

    /**
     * Create Group
     */
    socket.on('create_group', async ({ adminId, name, members }) => {
      try {
        const group = new Group({
          name,
          admin: adminId,
          members: [adminId, ...members],
        });
        await group.save();

        socket.emit('group_created', { message: 'Group created', group });
      } catch (err) {
        console.error('create_group error:', err.message);
        socket.emit('error', 'Failed to create group.');
      }
    });

    /**
     * Send Group Message
     */
    socket.on('send_group_message', async ({ senderId, groupId, text }) => {
      try {
        const group = await Group.findById(groupId);
        if (!group) return socket.emit('error', 'Group not found');

        if (!group.members.includes(senderId)) {
          return socket.emit('error', 'You are not a member of this group');
        }

        const message = new Message({ sender: senderId, group: groupId, text });
        await message.save();

        // Populate sender for UI
        const populatedMessage = await message.populate('sender', 'username');

        for (const memberId of group.members) {
          const socketId = activeUsers.get(memberId.toString());
          console.log(`Emitting event receive_group_message_${group._id} to socket:`, socketId);

          if (socketId) {
            io.to(socketId).emit(`receive_group_message_${groupId}`, populatedMessage);
          }
        }
      } catch (err) {
        console.error('send_group_message error:', err.message);
        socket.emit('error', 'Failed to send group message.');
      }
    });



    /**
     * Get Group Messages
     */
    socket.on('get_group_messages', async ({ groupId }) => {
      try {
        const messages = await Message.find({ group: groupId })
          .populate('sender', 'username')
          .sort({ createdAt: 1 });
        socket.emit(`group_messages_${groupId}`, messages);
      } catch (err) {
        console.error('get_group_messages error:', err.message);
        socket.emit('error', 'Failed to fetch group messages.');
      }
    });


    /**
     * Add Member to Group
     */
    socket.on('add_member', async ({ groupId, memberId, adminId }) => {
      try {
        const group = await Group.findById(groupId);
        if (!group) return socket.emit('error', 'Group not found');

        if (group.admin.toString() !== adminId) {
          return socket.emit('error', 'Only admin can add members');
        }

        if (group.members.includes(memberId)) {
          return socket.emit('error', 'User already a member');
        }

        group.members.push(memberId);
        await group.save();

        socket.emit('member_added', { message: 'Member added', group });
      } catch (err) {
        console.error('add_member error:', err.message);
        socket.emit('error', 'Failed to add member.');
      }
    });

    /**
     * Remove Member from Group
     */
    socket.on('remove_member', async ({ groupId, memberId, adminId }) => {
      try {
        const group = await Group.findById(groupId);
        if (!group) return socket.emit('error', 'Group not found');

        if (group.admin.toString() !== adminId) {
          return socket.emit('error', 'Only admin can remove members');
        }

        group.members = group.members.filter((m) => m.toString() !== memberId);
        await group.save();

        socket.emit('member_removed', { message: 'Member removed', group });
      } catch (err) {
        console.error('remove_member error:', err.message);
        socket.emit('error', 'Failed to remove member.');
      }
    });

    /**
     * Get Group Members
     */
    socket.on('get_group_members', async ({ groupId }) => {
      try {
        const group = await Group.findById(groupId).populate(['members', 'admin']);
        if (!group) return socket.emit('error', 'Group not found');

        socket.emit(`group_members_${groupId}`, {
          members: group.members,
          admin: group.admin,
        });
      } catch (err) {
        console.error('get_group_members error:', err.message);
        socket.emit('error', 'Failed to fetch group members.');
      }
    });

    /**
     * Get Groups of a User
     */
    socket.on('get_user_groups', async ({ userId }) => {
      try {
        const groups = await Group.find({ members: userId });
        socket.emit(`user_groups_${userId}`, groups);
      } catch (err) {
        console.error('get_user_groups error:', err.message);
        socket.emit('error', 'Failed to fetch user groups.');
      }
    });

    /**
     * Disconnect Cleanup
     */
    socket.on('disconnect', () => {
      console.log(`Client disconnected: ${socket.id}`);
      for (const [userId, sockId] of activeUsers.entries()) {
        if (sockId === socket.id) {
          activeUsers.delete(userId);
          console.log(`Removed user ${userId} from active users.`);
          break;
        }
      }
    });
  });
};
