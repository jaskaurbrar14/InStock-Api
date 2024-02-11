const router = require('express').Router();

const warehouseController = require('../controllers/warehouse-controller');

router.get('/warehouses', warehouseController.index);
router.put('/warehouses/:warehouse_id', warehouseController.edit);

module.exports = router;