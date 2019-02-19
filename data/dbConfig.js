const knex = require("knex");

const db = {
  development: {
    client: "sqlite3",
    connection: { filename: "./lambda.sqlite3" },
    useNullAsDefault: true
  }
};


module.exports = knex(db.development);
