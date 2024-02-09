const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
const PORT = process.env.PORT || 8081;
const userRoutes = require("./routes/warehouseRoutes");

const CLIENT_URL = process.env.CLIENT_URL;
app.use(cors({ origin: CLIENT_URL }));

app.use(express.json());

app.use("/warehouses", userRoutes);

app.listen(PORT, () => {
  console.log(`Running at http://localhost:${PORT}`);
});
