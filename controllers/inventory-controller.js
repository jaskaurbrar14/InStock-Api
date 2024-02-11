const knex = require("knex")(require("../knexfile"));

// Find an inventory by id
const findById = async (req, res) => {
  try {
    const { warehouse_id, inventory_id } = req.params;

    const inventory = await knex("inventories")
      .where({
        warehouse_id: warehouse_id,
        id: inventory_id,
      })
      .first();

    if (!inventory) {
      return res.status(404).json({
        error: `Inventory ${inventory_id} not found for warehouse ${warehouse_id}`,
      });
    }

    res.status(200).json(inventory);
  } catch (err) {
    console.error("Error fetching inventories:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

//Get list of all inventory items
const getInventoryList = async (_req, res) => {
  try {
    const inventories = await knex("inventories").select("*");
    res.status(200).json(inventories);
  } catch (err) {
    // console.error("Error fetching warehouses:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = {
  findById,
  getInventoryList,
};
