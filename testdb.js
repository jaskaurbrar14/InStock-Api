const knexConfig = require("./knexfile");

const knex = require("knex")(knexConfig);

knex
    .raw("SELECT 1+1 AS result")
    .then((queryResponse) => {
        console.log("Database connection sucessful:", queryResponse);
    })
    .catch((err) => {
        console.log("Database connection failed:", err);
    })
    .finally(() => {
        knex.destroy();
    });