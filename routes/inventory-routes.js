const router = require("express").Router();

const inventoryController = require("../controllers/inventory-controller");

router.get(
  "/warehouses/:warehouse_id/inventories/:inventory_id",
  inventoryController.findById
);

router.get("/", inventoryController.getInventory);
router.get("/", (req, res) => {
  console.log("Get request for inventory");
  res.send("Inventory Routes");
});

module.exports = router;
