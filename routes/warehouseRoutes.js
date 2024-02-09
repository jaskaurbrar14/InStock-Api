const knex = require("knex")(require("../knexfile"));
const router = express.Router();
//const { v4: uuidv4 } = require("uuid");

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const warehouseFound = await knex("warehouses").where({ id }).first();

    if (!warehouseFound) {
      return res.status(404).json({ error: "Warehouse not found" });
    }

    res.status(200).json(warehouseFound);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
