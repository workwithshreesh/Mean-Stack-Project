
require("dotenv").config()
module.exports = {
    HOST: process.env.DB_HOST || '127.0.0.1',
    USER: process.env.DB_USER || 'root',
    PASSWORD: process.env.DB_PASSWORD || 'root',
    DB: process.env.DB_NAME || 'CrudAssesment',
    // PORT: process.env.PORT || 3306,
    dialect: 'mysql',
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  };
  