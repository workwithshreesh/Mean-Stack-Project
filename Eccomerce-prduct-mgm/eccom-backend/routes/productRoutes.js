const express = require('express');
const router = express.Router();
const upload = require('../middleware/multerMiddleware');
const productController = require('../controller/product-controller'); // <- correct import

// Upload product with images
router.post('/upload', upload.array('images', 5), productController.createProductWithFiles);

// Other product routes
router.get('/', productController.getAllProducts);
router.get('/:id', productController.getProductById);
router.put('/:id', productController.updateProduct);
router.delete('/:id', productController.deleteProduct);

module.exports = router;
