const { Category } = require('../models');

// ➕ Create Category
exports.createCategory = async (req, res) => {
  try {
    const { name } = req.body;

    // Optional: prevent duplicates
    const existing = await Category.findOne({ where: { name } });
    if (existing) return res.status(400).json({ error: 'Category already exists' });

    const category = await Category.create({ name });
    res.status(201).json(category);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

//  Get All Categories
exports.getAllCategories = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;  // Get page and limit from the query parameters, default to page 1 and limit 10
    // Convert to integers
    const pageNumber = parseInt(page);
    const limitNumber = parseInt(limit);

    // Calculate the offset for pagination
    const offset = (pageNumber - 1) * limitNumber;


    const { count, rows } = await Category.findAndCountAll({
      limit: limitNumber,
      offset: offset
    });

    // Calculate the total pages
    const totalPages = Math.ceil(count / limitNumber);

    // Send the response with products, current page, and total pages
    res.json({
      category: rows,
      currentPage: pageNumber,
      totalPages: totalPages,
      totalCount: count
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

//  Get Single Category
exports.getCategoryById = async (req, res) => {
  try {
    const category = await Category.findByPk(req.params.id);
    if (!category) return res.status(404).json({ error: 'Category not found' });
    res.json(category);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

//  Update Category
exports.updateCategory = async (req, res) => {
  try {
    const { name } = req.body;
    const category = await Category.findByPk(req.params.id);

    if (!category) return res.status(404).json({ error: 'Category not found' });

    category.name = name || category.name;
    await category.save();

    res.json(category);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

//  Delete Category
exports.deleteCategory = async (req, res) => {
  try {
    const category = await Category.findByPk(req.params.id);
    if (!category) return res.status(404).json({ error: 'Category not found' });

    await category.destroy();
    res.json({ message: 'Category deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
