const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
const PORT = process.env.PORT || 8081;

const CLIENT_URL = process.env.CLIENT_URL;
app.use(cors({ origin: CLIENT_URL }));

app.use(express.json());

app.listen(PORT, () => {
  console.log(`Running at http://localhost:${PORT}`);
});
