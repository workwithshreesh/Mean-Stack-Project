const sequelize = require('../config/conn');
const Product = require('./product')(sequelize);
const Category = require('./category')(sequelize);
const Image = require('./image')(sequelize);

// Relations
Category.hasOne(Product, { foreignKey: 'categoryId', onDelete: 'CASCADE' });
Product.belongsTo(Category, { foreignKey: 'categoryId' });

Product.hasMany(Image, { foreignKey: 'productId', onDelete: 'CASCADE' });
Image.belongsTo(Product, { foreignKey: 'productId' });

module.exports = {
  sequelize,
  Product,
  Category,
  Image
};
