const express = require('express');
const router = express.Router();
const reportController = require('../controller/report-controller');
const auth = require('../middleware/authentiCAteMiddleware');

router.get('/:id', auth.verifyToken, auth.requireRole(['seller']), reportController.genrateSellerReport);

module.exports = router;
