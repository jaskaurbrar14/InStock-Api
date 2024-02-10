const router = require("express").Router();

const warehouseController = require("../controllers/warehouse-controller");

router.get("/warehouses", warehouseController.index);

//Get single Warehouse

router.get(
  "/inventories/:inventory_id/inventories/:inventory_id",
  inventoryController.findById
);

module.exports = router;
