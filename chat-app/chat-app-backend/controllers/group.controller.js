// controllers/group.controller.js
const Group = require('../models/group.model');
const Message = require('../models/onetoone.model');
const User = require('../models/user.model');

// Add member
exports.addMember = async (req, res) => {
    const { groupId } = req.params;
    const { memberId } = req.body;
    const userId = req.user.id;
  
    try {
      const group = await Group.findById(groupId);
      if (!group) return res.status(404).json({ message: 'Group not found' });
  
      if (group.admin.toString() !== userId) {
        return res.status(403).json({ message: 'Only admin can add members' });
      }
  
      if (group.members.includes(memberId)) {
        return res.status(400).json({ message: 'User already a member' });
      }
  
      group.members.push(memberId);
      await group.save();
  
      res.status(200).json({ message: 'Member added', group });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };


  // Get all member of group
  exports.getAllMember = async (req, res) => {
    const { groupId } = req.params;
    try{

      if(!groupId){
        return res.status(404).json({message: "Group id is not found"});
      }

      const group = await Group.findById(groupId).populate(['members','admin']);
      if (!group) return res.status(404).json({message: "Group is not found"});
      return res.status(200).json({
        members: group.members,
        admin: group.admin
      });

    } catch(err) {
      return res.status(500).json({message: err.message})
    }
  }
  
  // Remove member
  exports.removeMember = async (req, res) => {
    const { groupId } = req.params;
    const { memberId } = req.body;
    const userId = req.user.id;
      
    try {
      const group = await Group.findById(groupId);
      if (!group) return res.status(404).json({ message: 'Group not found' });
  
      if (group.admin.toString() !== userId) {
        return res.status(403).json({ message: 'Only admin can remove members' });
      }
  
      group.members = group.members.filter(m => m.toString() !== memberId);
      await group.save();
  
      res.status(200).json({ message: 'Member removed', group });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };
  
  // Get groups of logged in user
  exports.getUserGroups = async (req, res) => {
    const userId = req.user.id;
    try {
      const groups = await Group.find({ members: userId });
      res.status(200).json(groups);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };
  

exports.createGroup = async (req, res) => {
  const { name, members } = req.body;
  const admin = req.params.id;
  console.log(admin)
  try {
    const group = new Group({
      name,
      admin,
      members: [admin, ...members]
    });

    await group.save();

    res.status(201).json({ message: 'Group created', group });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};




exports.sendGroupMessage = async (req, res) => {
    try {
      const sender = req.user.id;  // Use authenticated user ID
      const { text } = req.body;
      const { groupId } = req.params;
  
      const group = await Group.findById(groupId);
      if (!group) return res.status(404).json({ message: 'Group not found' });
  
      // Check sender is member of group
      if (!group.members.some(m => m.toString() === sender)) {
        return res.status(403).json({ message: 'You are not a member of this group' });
      }
  
      const message = new Message({ sender, group: groupId, text });
      await message.save();
  
      res.status(201).json({ message: 'Group message sent', data: message });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Server error' });
    }
  };
  

exports.getGroupMessages = async (req, res) => {
  try {
    const { groupId } = req.params;
    const messages = await Message.find({ group: groupId })
      .populate('sender', 'username email')
      .sort({ createdAt: 1 });

    res.status(200).json(messages);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};
