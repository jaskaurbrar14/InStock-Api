const router = require("express").Router();

const inventoryController = require("../controllers/inventory-controller");

router.get(
  "/warehouses/:warehouse_id/inventories/:inventory_id",
  inventoryController.findById
);
router.post(
  "/:warehouse_id/api/inventories",
  inventoryController.createNewItem
);
router.put(
  "/warehouses/:warehouse_id/inventories",
  inventoryController.createNewItem
);

module.exports = router;
