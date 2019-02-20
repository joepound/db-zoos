const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.send(`
    <h1>Zoos & Bears API</h1>
    <p>Welcome to the Zoos & Bears API!</p>
  `)
});

module.exports = router;