const express = require('express');
const dotenv = require('dotenv');
const app = express();
dotenv.config();
const PORT = process.env.PORT || 5050;
const warehouseRoutes = require('./routes/warehouse-routes');
const inventoryRoutes = require('./routes/inventory-routes');
app.use(express.json());
app.use('/api', inventoryRoutes);
app.use('/api', warehouseRoutes);
app.listen(PORT, () => {
  console.log(PORT);
  console.log(`running at http://localhost:${PORT}`);
});