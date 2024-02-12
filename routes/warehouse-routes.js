const router = require("express").Router();

const warehouseController = require("../controllers/warehouse-controller");

router.post("/warehouses", warehouseController.addWarehouse);
router.get("/warehouses", warehouseController.index);
router.get("/warehouses/:warehouse_id", warehouseController.getWarehouseById);
router.put("/warehouses/:warehouse_id", warehouseController.edit);
router.delete("/warehouses/:id", warehouseController.remove);

module.exports = router;
