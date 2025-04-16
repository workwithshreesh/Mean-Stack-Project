const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('eccom-ass', 'postgres', 'root', {
  host: 'localhost',
  dialect: 'postgres', // or 'postgres'
  logging: false
});

module.exports = sequelize;
