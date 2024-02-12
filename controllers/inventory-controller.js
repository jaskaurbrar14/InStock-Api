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
  const { item_name, description, category, status, quantity } = req.body;
  const requiredFields = [
    "item_name",
    "description",
    "category",
    "status",
    "quantity",
  ];

  const missingField = requiredFields.filter((field) => !req.body[field]);

  if (missingField.length > 0) {
    const missingFieldsString = missingField.join(", ");
    return res.status(400).send({
      isSuccessful: false,
      message: `Missing required values in the create inventory item form: ${missingFieldsString}`,
    });
  }

  const warehouseId = req.params.warehouse_id;

  try {
    const warehouse = await knex("warehouses")
      .where({ id: warehouseId })
      .first();

    if (!warehouse)
      return res.status(400).json({ error: "The warehouse doesn't exist" });
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }

  if (isNaN(quantity)) {
    return res.status(400).json({ error: "quantity must be a number value" });
  }

  try {
    const [inventoryId] = await knex("inventories").insert({
      warehouse_id: warehouseId,
      item_name: req.body.item_name,
      description: req.body.description,
      category: req.body.category,
      status: req.body.status,
      quantity: req.body.quantity,
    });
    const createdItem = await knex("inventories")
      .where({ id: inventoryId })
      .first();
    res.status(201).json(createdItem);
  } catch (err) {
    res.status(500).json({ err: "Internal server error" });
  }
};

// Edit an inventory item
const editItem = async (req, res) => {
  const inventoryId = req.params.id;

  try {
    const Inventory = await knex("inventories")
      .where({ id: inventoryId })
      .first();

    if (!Inventory) {
      return res
        .status(404)
        .json({ error: "The Inventory item doesn't exist" });
    }
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }

  const requiredFields = [
    "warehouse_id",
    "item_name",
    "description",
    "category",
    "status",
    "quantity",
  ];

  const missingField = requiredFields.filter((field) => !req.body[field]);

  if (missingField.length > 0) {
    const missingFieldsString = missingField.join(", ");

    return res.status(400).send({
      isSuccessful: false,
      message: `Can't edit the inventory item as the required fields are missing: ${missingFieldsString}`,
    });
  }

  const warehouseId = req.params.warehouse_id;

  try {
    const warehouse = await knex("warehouses")
      .where({ id: warehouseId })
      .first();

    if (!warehouse) {
      return res.status(400).json({ error: "The warehouse doesn't exist" });
    }
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
  try {
    const Inventory = await knex("inventories")
      .where({ id: inventoryId })
      .first();
    if (!Inventory)
      return res
        .status(400)
        .json({ error: "The Inventory item doesn't exist" });
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }

  const quantity = req.body.quantity;
  if (isNaN(quantity)) {
    return res.status(400).json({ error: "quantity must be a number value" });
  }

  try {
    await knex("inventories")
      .where({
        id: inventoryId,
        warehouse_id: warehouseId,
      })
      .update({
        warehouse_id: warehouseId,
        item_name: req.body.item_name,
        description: req.body.description,
        category: req.body.category,
        status: req.body.status,
        quantity: req.body.quantity,
      });

    const updatedItem = await knex("inventories")
      .where({ id: inventoryId, warehouse_id: warehouseId })
      .first();
    res.status(200).json(updatedItem);
  } catch (err) {
    res.status(500).json({ err: "Internal server error" });
  }
};
module.exports = {
  findById,
  createNewItem,
  editItem,
};
