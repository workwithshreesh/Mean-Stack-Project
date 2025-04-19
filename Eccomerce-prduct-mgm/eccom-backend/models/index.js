const sequelize = require('../config/conn');
const Product = require('./product')(sequelize);
const Category = require('./category')(sequelize);
const User = require('./User')(sequelize);
const Image = require('./image')(sequelize);

// Relations
Category.hasOne(Product, { foreignKey: 'categoryId', onDelete: 'CASCADE' });
Product.belongsTo(Category, { foreignKey: 'categoryId' });

Product.hasMany(Image, { foreignKey: 'productId', onDelete: 'CASCADE' });
Image.belongsTo(Product, { foreignKey: 'productId' });

User.hasMany(Product, {foreignKey: 'userId', onDelete: 'CASCADE' });
Product.belongsTo(User, {foreignKey: 'userId' });

User.hasMany(Category, {foreignKey: 'userId', onDelete: 'CASCADE' });
Category.belongsTo(User, {foreignKey: 'userId' });

module.exports = {
  sequelize,
  Product,
  Category,
  Image, 
  User
};
