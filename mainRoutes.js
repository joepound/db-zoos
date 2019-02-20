const express = require("express");

const db = require("./data/dbConfig");

function route(tableName) {
  const router = express.Router();

  router.get("/", (req, res) => {
    console.log(`\nAttempting to GET all ${tableName}...`);
    db(tableName)
      .then(rows => res.status(200).json(rows))
      .catch(err => {
        console.log(err);
        res.status(500).json({
          err
        });
      })
      .finally(console.log(`GET all ${tableName} attempt finished.`));
  });

  router.get("/:id", (req, res) => {
    const { id } = req.params;

    console.log(`\nAttempting to GET all ${tableName} with ID [${id}]...`);
    db(tableName)
      .where({ id })
      .first()
      .then(row => {
        if (row) {
          res.status(200).json(rows);
        } else {
          res.status(404).json("Supplied ID does not belong to any entry.");
        }
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({
          err
        });
      })
      .finally(
        console.log(
          `GET attempt for any ${tableName} with ID [${id}] finished.`
        )
      );
  });

  return router;
}

module.exports = route;
