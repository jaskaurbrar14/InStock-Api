const router = require('express').Router();

const warehouseController = require('../controllers/warehouse-controller');

router.get('/warehouses', warehouseController.index);
router.delete('/warehouses/:id', warehouseController.remove);

module.exports = router;