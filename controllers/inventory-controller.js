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
                status: 404,
                error: `Inventory ${inventory_id} not found for warehouse ${warehouse_id}` 
            });
        }

        res.status(200).json(inventory);
    } catch(err) {
        console.error('Error fetching inventories:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
}

module.exports = {
    findById,
};
