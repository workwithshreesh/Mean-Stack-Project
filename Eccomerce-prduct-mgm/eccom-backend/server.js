const express = require('express');
const bodyParser = require('body-parser');
const { sequelize } = require('./models');
const productRoutes = require('./routes/productRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const path = require('path');

const app = express();
app.use(bodyParser.json());

// Serve static images
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use('/api/products', productRoutes);
app.use('/api/categories', categoryRoutes);

sequelize.sync({ alter: true }).then(() => {
  console.log('DB Synced');
  app.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
  });
});
