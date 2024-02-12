const router = require("express").Router();

const inventoryController = require("../controllers/inventory-controller");
router.get(
  "/warehouses/:warehouse_id/inventories/:inventory_id",
  inventoryController.findById
);
router.delete("/inventories/:id", inventoryController.remove);
router.post(
  "/warehouses/:warehouse_id/inventories",
  inventoryController.createNewItem
);
router.put(
  "/warehouses/:warehouse_id/inventories/:id",
  inventoryController.editItem
);

module.exports = router;
