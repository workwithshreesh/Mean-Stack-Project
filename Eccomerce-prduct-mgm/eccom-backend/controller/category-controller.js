const { Category } = require('../models');
const { Op } = require("sequelize");


// Search Suggestions api
exports.getSuggestions = async (req, res) => {
  try {
    const search = req.query.search;

    if (!search || !search.trim()) return res.status(200).json([]);
    

    const suggestion = await Category.findAll({
      where: {
        name: {
          [Op.like]: `${search}%`  // Case-insensitive search for PostgreSQL
        }
      },
      attributes: ['id', 'name'],
      limit: 5
    });

    return res.status(200).json(suggestion);
  } catch (error) {
    console.error("Error in getSuggestions:", error);
    return res.status(500).json({ error: "An error occurred while fetching suggestions." });
  }
};



// Create Category
exports.createCategory = async (req, res) => {
  try {
    const { name, userId } = req.body;

    // Optional: prevent duplicates
    const existing = await Category.findOne({ where: { 
      name: name,
      userId: userId
    } });
    if (existing) return res.status(400).json({ error: 'Category already exists' });

    const category = await Category.create({ name, userId });
    res.status(201).json(category);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};




//  Get All Categories
exports.getAllCategories = async (req, res) => {
  try {
    const { page = 1, limit = 10, search = '' } = req.query;  // get page limit and and currentpage and search in query parameter
    // Convert to integers
    const pageNumber = parseInt(page);
    const limitNumber = parseInt(limit);

    // Search query parameter
    const whereClause = search ? 
    {
      name: {
        [Op.like]: `%${search}%`  
      }
    } : {}

    // Calculate the offset for pagination
    const offset = (pageNumber - 1) * limitNumber;


    const { count, rows } = await Category.findAndCountAll({
      where: whereClause,
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




//  Get All Categories by userId
exports.getAllCategoriesUserId = async (req, res) => {
  try {
    const { page = 1, limit = 10, search = '' } = req.query;  // get page limit and and currentpage and search in query parameter

    const userId = req.params.id;


    // Convert to integers
    const pageNumber = parseInt(page);
    const limitNumber = parseInt(limit);

    // Dynamic where clause serach userId
    const whereClause = {
      userId: userId
    }

    // Search query parameter
    if(search){
      whereClause.name = {
        [Op.like]: `%${search}%`  
      }
    }

    // Calculate the offset for pagination
    const offset = (pageNumber - 1) * limitNumber;


    const { count, rows } = await Category.findAndCountAll({
      where: whereClause,
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
