const router = require("express").Router();

const inventoryController = require("../controllers/inventory-controller");

router.get(
  "/warehouses/:warehouse_id/inventories/:inventory_id",
  inventoryController.findById
);

router.get("/inventories", inventoryController.getInventoryList);

module.exports = router;
