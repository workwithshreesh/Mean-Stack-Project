// routes/user.routes.js
const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');
const { authenticate } = require('../middlewares/auth.middleware');

router.get('/search', authenticate, userController.searchUsers);
router.get('/:id', authenticate, userController.getUserById); 

module.exports = router;
