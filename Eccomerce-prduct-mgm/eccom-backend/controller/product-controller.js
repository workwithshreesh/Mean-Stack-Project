const { Product, Category, Image } = require('../models');
const path = require('path');
const fs = require('fs');

exports.createProductWithFiles = async (req, res) => {
  try {
    const { name, price, categoryId } = req.body;

    let category = await Category.findOne({ where: { id: categoryId } });
    if (!category) {
    //   category = await Category.create({ name: categoryName });
    return res.status(404).json({message:"Category id is not found!"})
    }

    const product = await Product.create({
      name,
      price,
      categoryId: category.id
    });

    if (req.files && req.files.length > 0) {
      const images = req.files.map(file => ({
        url:  file.filename,
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
    const products = await Product.findAll({
      include: [Category, Image]
    });
    res.json(products);
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
  try {
    const { name, price, categoryName } = req.body;
    const product = await Product.findByPk(req.params.id);

    if (!product) return res.status(404).json({ error: 'Product not found' });

    let category = await Category.findOne({ where: { name: categoryName } });
    if (!category) {
      category = await Category.create({ name: categoryName });
    }

    product.name = name || product.name;
    product.price = price || product.price;
    product.categoryId = category.id;

    await product.save();

    const updatedProduct = await Product.findByPk(product.id, {
      include: [Category, Image]
    });

    res.json(updatedProduct);
  } catch (err) {
    res.status(500).json({ error: err.message });
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
