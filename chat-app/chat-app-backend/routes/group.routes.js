const express = require('express');
const router = express.Router();

const groupController = require('../controllers/group.controller');
const { authenticate } = require('../middlewares/auth.middleware'); // Adjust path accordingly

// Protect routes that require authentication
router.post('/groups/:id', authenticate, groupController.createGroup);
router.get('/groups', authenticate, groupController.getUserGroups);
router.post('/groups/:groupId/members', authenticate, groupController.addMember);
router.delete('/groups/:groupId/members', authenticate, groupController.removeMember);
router.post('/groups/:groupId/messages', authenticate, groupController.sendGroupMessage);
router.get('/groups/:groupId/messages', authenticate, groupController.getGroupMessages);

module.exports = router;
