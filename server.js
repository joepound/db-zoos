
const express = require("express");
const helmet = require("helmet");

const db = require('./data/dbConfig');

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