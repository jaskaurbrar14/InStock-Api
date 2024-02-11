const express = require("express");
const dotenv = require("dotenv");
const app = express();
const warehousesRoutes = require('./routes/warehouse-routes'); 
const cors = require("cors");

app.use(cors());
app.use(express.json());

// Use the warehouses route
app.use("/warehouse", warehousesRoutes);

// Load the variables from .env file
// dotenv.config();

const PORT = process.env.SERVER_PORT || 5050;

const warehouseRoutes = require("./routes/warehouse-routes");
const inventoryRoutes = require("./routes/inventory-routes");
app.use(cors());
app.use(express.json());

// all requests map here and each indivdiual route has specific apis
app.use("/api", inventoryRoutes);
app.use("/warehouses", warehouseRoutes);

app.listen(PORT, () => {
  console.log(PORT);
  console.log(`running at http://localhost:${PORT}`);
});
