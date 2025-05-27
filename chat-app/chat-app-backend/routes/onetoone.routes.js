// routes/message.routes.js
const express = require('express');
const router = express.Router();
const messageController = require('../controllers/onetoone.controller');
const { authenticate } = require('../middlewares/auth.middleware');

router.post('/', authenticate, messageController.sendMessage);
router.get('/private', authenticate, messageController.getMessages);
router.get('/users', authenticate, messageController.getChattedUsers);

module.exports = router;
