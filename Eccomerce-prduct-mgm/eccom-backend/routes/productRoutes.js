const express = require('express');
const router = express.Router();
const auth = require("../middleware/authentiCAteMiddleware");
const upload = require('../middleware/multerMiddleware');
const productController = require('../controller/product-controller'); 

// Only 'seller' can upload products
router.post(
  '/upload',
  auth.verifyToken,
  auth.requireRole(['seller']),
  upload.array('images', 5),
  productController.createProductWithFiles
);


// create a bulk product
// router.post(
//   '/createbulk', auth.verifyToken,
//   auth.requireRole(['seller']),
//   productController.bulkUploadProducts
// );

// Public routes
router.get("/suggestion", productController.getSuggestions);
router.get('/', productController.getAllProducts);

// Only authenticated users can view product by ID
router.get('/:id', auth.verifyToken, productController.getProductById);

// get by user id
router.get('/getall/:id', auth.verifyToken, auth.requireRole(['seller']) ,productController.getAllProductsUserID)

// Only 'seller' can update or delete products
router.put(
  '/:id',
  auth.verifyToken,
  auth.requireRole(['seller']),
  upload.array('images', 5),
  productController.updateProduct
);

router.delete(
  '/:id',
  auth.verifyToken,
  auth.requireRole(['seller']),
  productController.deleteProduct
);

module.exports = router;
