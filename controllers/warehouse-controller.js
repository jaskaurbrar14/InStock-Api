const knex = require("knex")(require("../knexfile"));

// list all warehouses
const index = async (_req, res) => {
  try {
    const warehouses = await knex("warehouses").select("*");
    res.status(200).json(warehouses);
  } catch (err) {
    console.error("Error fetching warehouses:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Get warehouse by ID
const getSingleWarehouse = async (req, res) => {
  try {
    const warehouse = await knex("warehouses")
      .where({ id: req.params.id })
      .first();

    if (!warehouse) {
      return res.status(404).json({
        message: `Warehouse with ID ${req.params.id} not found`,
      });
    }
    res.status(200).json(warehouse);
  } catch (error) {
    console.error("Error retrieving warehouse data:", error);
    res.status(500).json({
      message: `Unable to retrieve warehouse data for warehouse with ID ${req.params.id}`,
    });
    console.error(error);
  }
};

module.exports = {
  index,
  getSingleWarehouse,
};
