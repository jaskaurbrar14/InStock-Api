const knex = require('knex')(require('../knexfile'));

// Find an inventory by id
const findById = async (req, res) => {
    try {
        const { warehouse_id, inventory_id } = req.params;
        
        const inventory = await knex('inventories')
            .where(
                { 
                    warehouse_id: warehouse_id, 
                    id: inventory_id 
                }).first(); 

        if (!inventory) {
            return res.status(404).json({ 
                error: `Inventory ${inventory_id} not found for warehouse ${warehouse_id}` 
            });
        }

        res.status(200).json(inventory);
    } catch(err) {
        console.error('Error fetching inventories:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
}
const remove = async (req, res) => {
    try {
      const rowsDeleted = await knex('inventories')
        .where({ id: req.params.id })
        .delete();
  
      if (rowsDeleted === 0) {
        return res
          .status(404)
          .json({ message: `Inventory with ID ${req.params.id} not found` });
      }
      res.sendStatus(204);
    } catch (error) {
      res.status(500).json({
        message: `Unable to delete inventory: ${error}`
      });
    }
  };
module.exports =
module.exports = {
    findById,
    remove
};
