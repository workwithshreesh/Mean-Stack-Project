// routes/message.routes.js
const express = require('express');
const router = express.Router();
const messageController = require('../controllers/message.controller');

router.post('/', messageController.sendMessage);
router.get('/private', messageController.getMessages);
router.get('/group/:group', messageController.getGroupMessages);

module.exports = router;
