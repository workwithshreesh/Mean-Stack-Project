const express = require("express");
const { getProducts, InsertProducts, EditProducts, DeleteProducts, TruncateData } = require("../controller/productController")
const router = express.Router();

// getProducts,
//     InsertProducts,
//     EditProducts,
//     DeleteProducts,
//     TruncateData,

router.get("/get-all-product",getProducts);
router.post("/post-product", InsertProducts);
router.put("/edit-product/:id",EditProducts);
router.delete("/delete-product/:id", DeleteProducts);
router.delete("/delete-all-product",TruncateData);


module.exports = router

