const knex = require('knex')(require('../knexfile'));

const index = async (_req, res) => {
    try {
        const warehouses = await knex('warehouses').select('*');
        res.status(200).json(warehouses);
    } catch(error) {
        console.error('Error fetching warehouses:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}
const remove = async (req, res) => {
    try {
      const rowsDeleted = await knex('warehouses')
        .where({ id: req.params.id })
        .delete();
  
      if (rowsDeleted === 0) {
        return res
          .status(404)
          .json({ message: `Warehouse with ID ${req.params.id} not found` });
      }
      res.sendStatus(204);
    } catch (error) {
      res.status(500).json({
        message: `Unable to delete user: ${error}`
      });
    }
  };
module.exports = {
    index,
    remove,
};