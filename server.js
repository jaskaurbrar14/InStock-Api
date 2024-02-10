
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
