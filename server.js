const express = require("express");
const helmet = require("helmet");

const knex = require("knex");

const knexConfig = {
  client: "sqlite3",
  connection: { filename: "./data/lambda.sqlite3" },
  useNullAsDefault: true
};

const db = knex(knexConfig);

const server = express();

server.use(express.json());
server.use(helmet());

// endpoints here

server.get("/api/zoos", (req, res) => {
  db("zoos")
    .then(baaa => res.status(200).json(baaa))
    .catch(err => {
      console.log(err);
      res.status(500).json({
        err
      });
    });
});

module.exports = server;
