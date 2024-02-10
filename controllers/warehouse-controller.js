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

//Single Warehouse
const singleData = async (req, res) => {
  try {
    const { warehouse_id, inventory_id } = req.params;

    const warehouse = await knex("warehouse")
      .where({
        inventory_id: inventory_id,
        id: warehouse_id,
      })
      .first();

    if (!warehouse) {
      return res.status(404).json({
        error: `Warehouse ${warehouse_id} not found for warehouse ${inventory_id}`,
      });
    }

    res.status(200).json(warehouse);
  } catch (err) {
    console.error("Error fetching warehouses:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = {
  index,
  singleData,
};
