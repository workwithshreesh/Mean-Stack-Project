const express = require('express');
const { sequelize } = require('./models');
const productRoutes = require('./routes/productRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const authRoute = require("./routes/userRoute");
const reportRoute = require('./routes/reportRoutes');
const path = require('path');
const cors = require("cors");

const app = express();

// Allow origin
app.use(cors());


//  Parse JSON for regular APIs
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static images
app.use('/api/uploads', express.static(path.join(__dirname, 'uploads')));

app.use('/api/products', productRoutes);
app.use('/api/categories', categoryRoutes);
app.use("/api/auth", authRoute);
app.use('/api/report', reportRoute);


sequelize.sync({ alter: true }).then(() => {
  console.log('DB Synced');
  app.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
  });
});
