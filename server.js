<<<<<<< HEAD

require("dotenv").config();
const express = require('express');
const app = express();
const warehousesRoutes = require('./routes/warehouseRoutes'); 
const PORT = process.env.PORT || 3000;
const cors = require("cors");

app.use(cors());
app.use(express.json());

// Use the warehouses route
app.use("/warehouse", warehousesRoutes);



app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
=======
const express = require('express');
const dotenv = require('dotenv');
const app = express();

// Load the variables from .env file
dotenv.config();

const PORT = process.env.PORT || 5050;

const warehouseRoutes = require('./routes/warehouse-routes');
const inventoryRoutes = require('./routes/inventory-routes');

app.use(express.json());

// all requests map here and each indivdiual route has specific apis
app.use('/api', inventoryRoutes);
app.use('/api', warehouseRoutes);

app.listen(PORT, () => {
  console.log(PORT);
  console.log(`running at http://localhost:${PORT}`);
});
>>>>>>> 708daf3ecdf93d6c628e7fbd02357496052eb3f4
