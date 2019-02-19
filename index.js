const express = require('express');
const helmet = require('helmet');


const knex = require("knex");

const knexConfig = {
  development: {
    client: "sqlite3",
    connection: { filename: "./data/lambda.sqlite3" },
    useNullAsDefault: true
  }
};

const db = knex(knexConfig.development);


const server = express();

server.use(express.json());
server.use(helmet());

// endpoints here

server.get("/api/zoos", async (req, res) => {
  try {
    const baaa = await db("zoos")
    res.status(200).json(baaa);
  } catch(err){
    console.log(err);
    res.status(500).json({
      err
    });
  }
});

const port = 3300;
server.listen(port, function() {
  console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`);
});
