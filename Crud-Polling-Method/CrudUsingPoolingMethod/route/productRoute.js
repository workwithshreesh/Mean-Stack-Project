const express = require("express");
const { getProducts, InsertProducts, EditProducts, DeleteProducts, TruncateData } = require("../controller/productController")
const router = express.Router();

// getProducts,
//     InsertProducts,
//     EditProducts,


router.get("/products", getProducts);
router.post("/products", InsertProducts);
router.put("/products/:id", EditProducts);
router.delete("/products/:id", DeleteProducts);
router.delete("/products", TruncateData);


module.exports = router

