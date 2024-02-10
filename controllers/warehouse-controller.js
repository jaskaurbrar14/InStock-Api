const knex = require("knex")(require("../knexfile"));

// list all warehouses
const index = async (_req, res) => {
  try {
    const warehouses = await knex("warehouses").select("*");
    res.status(200).json(warehouses);
  } catch (err) {
    console.error("Error fetching warehouses:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = {
  index,
};
