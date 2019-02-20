const express = require("express");

const db = require("./data/dbConfig");

function route(tableName) {
  const router = express.Router();

  router.post("/", function(req, res) {
    console.log(
      `\nAttempting to POST new database entry to records for ${tableName}...`
    );

    const { name } = req.body;

    console.log("Checking if name was supplied...");
    if (name) {
      db(tableName)
        .insert({ name })
        .then(newRow => res.status(201).json(newRow[0]))
        .catch(err => {
          if (err.errno === 19) {
            res
              .status(400)
              .json({ error: `Name is not unique in ${tableName} record.` });
          } else {
            res.status(500).json(err);
          }
        })
        .finally(console.log(`POST attempt for ${tableName} record finished.`));
    } else {
      res.status(400).json({ error: "No name was supplied." });
      console.log(`POST attempt for ${tableName} record finished.`);
    }
  });

  router.get("/", function(req, res) {
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

  router.get("/:id", function(req, res) {
    const { id } = req.params;

    console.log(`\nAttempting to GET all ${tableName} with ID [${id}]...`);
    db(tableName)
      .where({ id })
      .first()
      .then(row => {
        if (row) {
          res.status(200).json(row);
        } else {
          res
            .status(404)
            .json({ error: "Supplied ID does not belong to any entry." });
        }
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      })
      .finally(
        console.log(
          `GET attempt for any ${tableName} with ID [${id}] finished.`
        )
      );
  });

  router.delete("/:id", function(req, res) {
    const { id } = req.params;

    console.log(`\nAttempting to DELETE all ${tableName} with ID [${id}]...`);
    db(tableName)
      .where({ id })
      .del()
      .then(deletionCount => {
        if (deletionCount) {
          res.sendStatus(200);
        } else {
          res
            .status(404)
            .json({ error: "Supplied ID does not belong to any entry." });
        }
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      })
      .finally(`DELETE attempt for any ${tableName} with ID [${id}] finished.`);
  });

  return router;
}

module.exports = route;
