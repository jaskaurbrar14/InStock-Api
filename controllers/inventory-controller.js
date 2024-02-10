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

// Create a new inventory item
const createNewItem = async (req, res) => {
  const warehouseId = req.params.warehouse_id;

  const { item_name, description, category, status, quantity } = req.body;
  if (!item_name || !description || !category || !status || !quantity) {
    return res.status(400).json({
      error: "Missing required values in the create inventory item form",
    });
  }
  //   next();
  try {
    await knex("warehouses").where({ id: "warehouseId" }).first();
    // if (!checkWarehouse) {
    //   return res.status(400).json({ error: "The warehouse doesn't exist" });
    // }
  } catch (error) {
    res.status(400).json({ error: "The warehouse doesn't exist" });
  }
  //   next();
  if (isNaN(quantity)) {
    return res.status(400).json({ error: "quantity must be a number value" });
  }
  //   next();

  try {
    const [inventoryId] = await knex("inventories").insert({
      warehouse_id: warehouseId,
      item_name: req.body.item_name,
      description: req.body.description,
      category: req.body.category,
      status: req.body.status,
      quantity: req.body.quantity,
      created_at: Date.now(),
    });
    const createdItem = await knex("inventories")
      .where({ id: inventoryId })
      .first();
    res.status(201).json(createdItem);
  } catch (err) {
    res.status(500).json({ err: "Internal server error" });
  }
};

module.exports = {
  findById,
  createNewItem,
};
