const express = require('express');
const { sequelize } = require('./models');
const socLogger = require('./config/mongoDbConn');
const productRoutes = require('./routes/productRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const authRoute = require("./routes/userRoute");
const reportRoute = require('./routes/reportRoutes');
const artifact = require('./routes/artifact');
const startCron = require('./loggerCron');
const path = require('path');
const cors = require("cors");

const app = express();

// Allow origin
app.use(cors({ origin: '*' }));
// Parse JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// Serve static images
app.use('/api/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
app.use('/api/products', productRoutes);
app.use('/api/categories', categoryRoutes);
app.use("/api/auth", authRoute);
app.use('/api/report', reportRoute);
app.use('/api/artifact', artifact);

// HTTP audit middleware (after routes OR before — both ok)
app.use(require("./middleware/httpAuditMiddleware"));

/* START SERVER ONLY AFTER DBs ARE READY */
(async () => {
  try {
    await socLogger();
    console.log("MongoDB connected");

    await sequelize.sync({ alter: true });
    console.log("DB Synced");

    //  START CRON ONLY AFTER DB READY
    startCron();
    console.log("Cron started");

    app.listen(3000, () => {
      console.log('Server running on http://localhost:3000');
    });

  } catch (err) {
    console.error("Startup failed:", err);
    process.exit(1);
  }
})();
