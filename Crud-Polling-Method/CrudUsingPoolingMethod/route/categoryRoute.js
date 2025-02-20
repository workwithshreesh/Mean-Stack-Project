const express = require("express");
const { getcategories, InsertCategory, EditCategory, DeleteCategory, TruncateData  } = require("../controller/categoryController")
const router = express.Router();

router.get("/get-all-category", getcategories)
router.post("/post-category", InsertCategory)
router.put("/edit-category/:id", EditCategory)
router.delete("/delete-category/:id", DeleteCategory)
router.delete("/delete-all-data",TruncateData)

module.exports = router