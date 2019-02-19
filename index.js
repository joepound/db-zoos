const port = process.env.PORT || 3300;

const server = require("./server");
server.listen(port, () =>
  console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`)
);
