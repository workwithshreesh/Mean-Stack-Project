const { Product, Category, Image } = require('../models');
const { Op } = require("sequelize");
const fs = require("fs");
const path = require('path');


// Suggestion
exports.getSuggestions = async (req, res) => {
  try {

    const search = req.query.search

    if(!search && !search.trim()) return res.status(200).json([]);

    const suggestion = await Product.findAll({
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
}



// create new product
exports.createProductWithFiles = async (req, res) => {
  try {
    const { name, price, categoryId, userId } = req.body;

    let category = await Category.findOne({ where: { id: categoryId } });
    if (!category) {
      //   category = await Category.create({ name: categoryName });
      return res.status(404).json({ message: "Category id is not found!" })
    }

    const product = await Product.create({
      name,
      price,
      categoryId,
      userId
    });

    if (req.files && req.files.length > 0) {
      const images = req.files.map(file => ({
        url: file.filename,
        altText: file.originalname,
        productId: product.id
      }));

      await Image.bulkCreate(images);
    }

    const result = await Product.findByPk(product.id, {
      include: [Category, Image]
    });

    res.status(201).json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};







// Get all products
exports.getAllProducts = async (req, res) => {
  try {
    const { page = 1, limit = 10, search = '' } = req.query;  // Get page and limit from the query parameters, default to page 1 and limit 10
    
    // Convert to integers
    const pageNumber = parseInt(page);
    const limitNumber = parseInt(limit);

    // Calculate the offset for pagination
    const offset = (pageNumber - 1) * limitNumber;

    // search the query using where clause
    const whereClause = search ? {
      name: {
        [Op.like]: `%${search}%`
      }
    } : {};

    // Fetch products with pagination and ordering by price
    const { count, rows } = await Product.findAndCountAll({
      where: whereClause,
      include: [Category, Image],
      order: [['price', 'ASC']],  // or 'DESC' for descending
      limit: limitNumber,
      offset: offset
    });

    // Calculate the total pages
    const totalPages = Math.ceil(count / limitNumber);

    // Send the response with products, current page, and total pages
    res.json({
      products: rows,
      currentPage: pageNumber,
      totalPages: totalPages,
      totalCount: count
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};




exports.getAllProductsUserID = async (req, res) => {
  try {
    const { page = 1, limit = 10, search = '' } = req.query;
    const userId = req.params.id;

    const pageNumber = parseInt(page);
    const limitNumber = parseInt(limit);
    const offset = (pageNumber - 1) * limitNumber;

    // Dynamic where clause with search and userId
    const whereClause = {
      userId: userId, // Match userId
    };

    if (search) {
      whereClause.name = {
        [Op.like]: `%${search}%`
      };
    }

    const { count, rows } = await Product.findAndCountAll({
      where: whereClause,
      include: [Category, Image],
      order: [['price', 'ASC']],
      limit: limitNumber,
      offset: offset
    });

    const totalPages = Math.ceil(count / limitNumber);

    res.json({
      products: rows,
      currentPage: pageNumber,
      totalPages: totalPages,
      totalCount: count
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};





// Get single product
exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id, {
      include: [Category, Image]
    });
    if (!product) return res.status(404).json({ error: 'Product not found' });
    res.json(product);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};





// Update product
exports.updateProduct = async (req, res) => {
  const id = parseInt(req.params.id);
  const { name, price, sku } = req.body;

  try {
    const product = await Product.findOne({
      where: { id },
      include: [{ model: Image }]
    });

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Update product fields
    if (sku) product.sku = sku;
    if (name) product.name = name;
    if (price) product.price = parseFloat(price);

    //  Update image records instead of creating
    const files = req.files || [];
    const existingImages = product.Images || [];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const existingImage = existingImages[i];

      if (existingImage) {
        // Remove old image file
        const oldPath = path.join(__dirname, '../uploads', existingImage.url);
        if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);

        // Update the existing DB record
        existingImage.url = file.filename;
        existingImage.altText = file.originalname;
        await existingImage.save();
      } else {
        // Create a new image record if more files are uploaded than existing images
        await Image.create({
          url: file.filename,
          altText: file.originalname,
          productId: product.id
        });
      }
    }

    await product.save();

    const updatedProduct = await Product.findOne({
      where: { id: product.id },
      include: [Image, Category],
    });

    res.status(200).json({
      message: "Product updated successfully",
      product: updatedProduct,
    });
  } catch (error) {
    console.error("Error updating product:", error);
    res.status(500).json({ message: "Error updating product", error: error.message });
  }
};





// Delete product
exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id, {
      include: [Image]
    });

    if (!product) return res.status(404).json({ error: 'Product not found' });

    // Delete images from disk
    if (product.Images.length > 0) {
      product.Images.forEach(img => {
        const filePath = path.join(__dirname, '..', img.url);
        if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
      });
    }

    await product.destroy();
    res.json({ message: 'Product deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
