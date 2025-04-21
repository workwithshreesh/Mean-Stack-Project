const express = require('express');
const router = express.Router();
const auth = require("../middleware/authentiCAteMiddleware");
const controller = require('../controller/category-controller');

// CRUD routes
router.post(
    '/', 
    auth.verifyToken,
    auth.requireRole(['seller']),
    controller.createCategory
    );

router.get(
    '/suggestion', 
    auth.verifyToken,
    auth.requireRole(['seller']),
    controller.getSuggestions
    );

router.get(
    '/',
    auth.verifyToken,
    auth.requireRole(['seller']),
    controller.getAllCategories
    );

router.get(
    '/:id',
    auth.verifyToken,
    auth.requireRole(['seller']),
    controller.getCategoryById
     );


router.get(
     '/getall/:id',
    auth.verifyToken,
    auth.requireRole(['seller']),
    controller.getAllCategoriesUserId
    );

router.put(
    '/:id',
    auth.verifyToken,
    auth.requireRole(['seller']), 
    controller.updateCategory
    );

router.delete(
    '/:id',
    auth.verifyToken,
    auth.requireRole(['seller']), 
    controller.deleteCategory
    );

module.exports = router;
