const mysql = require('mysql2');
const dbConfig = require('../config/db.config.js');

// Creating a MySQL connection pool
const pool = mysql.createPool({
  host: dbConfig.HOST,
  user: dbConfig.USER,
  password: dbConfig.PASSWORD,
  database: dbConfig.DB,
  connectionLimit: dbConfig.pool.max,
  
});

const promisePool = pool.promise();

// Test database connection (optional)
pool.getConnection((err, connection) => {
  if (err) {
    console.error("Error connecting to the database:", err);
  } else {
    console.log("Database connected successfully");
    connection.release(); 
  }
});

module.exports = promisePool;
