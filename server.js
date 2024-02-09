const express = require('express');
const dotenv = require('dotenv');
const app = express();

// Load the variables from .env file
dotenv.config();

const PORT = process.env.PORT || 5050;

const warehouseRoutes = require('./routes/warehouse-routes');

app.use(express.json());

// all warehouse apis
app.use('/warehouses', warehouseRoutes);

app.listen(PORT, () => {
  console.log(PORT);
  console.log(`running at http://localhost:${PORT}`);
});