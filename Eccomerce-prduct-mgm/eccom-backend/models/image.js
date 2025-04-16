const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  return sequelize.define('Image', {
    url: { type: DataTypes.STRING, allowNull: false },
    altText: { type: DataTypes.STRING }
  });
};
