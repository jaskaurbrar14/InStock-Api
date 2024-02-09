const knex = require("knex")(require("../knexfile"));
const router = express.Router();
//const { v4: uuidv4 } = require("uuid");

router.get("/", async (_req, res) => {
  try {
    const data = await knex("user");
    res.status(200).json(data);
  } catch (err) {
    res.status(400).send(`Error retrieving Users: ${err}`);
  }
});

module.exports = router;
