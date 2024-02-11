const router = require("express").Router();

const warehouseController = require("../controllers/warehouse-controller");

router.get("/warehouses", warehouseController.index);

//Get single Warehouse

router.get("/:id", warehouseController.getWarehouseById);

module.exports = router;
