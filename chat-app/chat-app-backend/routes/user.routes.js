// routes/user.routes.js
const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');

router.get('/search', userController.searchUsers);
router.get('/:id', userController.getUserById); 

module.exports = router;
