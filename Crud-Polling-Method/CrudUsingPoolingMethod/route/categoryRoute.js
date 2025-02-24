const express = require("express");
const { getcategories, InsertCategory, EditCategory, DeleteCategory, TruncateData  } = require("../controller/categoryController")
const router = express.Router();

router.get("/categories", getcategories);
router.post("/categories", InsertCategory);
router.put("/categories/:id", EditCategory);
router.delete("/categories/:id", DeleteCategory);
router.delete("/categories", TruncateData);

module.exports = router