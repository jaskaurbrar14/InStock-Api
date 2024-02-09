const router = require('express').Router();

const warehouseController = require('../controllers/warehouse-controller');

router.get('/warehouses', warehouseController.index);

module.exports = router;