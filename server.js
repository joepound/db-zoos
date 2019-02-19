/* Server imports */

const express = require("express");
const helmet = require("helmet");
const morgan = require("morgan");

// const zooRoutes = require("./middleware/routes/zoos/routes");
// const bearRoutes = require("./middleware/routes/bears/routes");
const rootRoute = require("./middleware/routes/root");

const errorRouter = require("./middleware/routes/errorRouter");

// server setup
const server = express();

// built-in middleware
server.use(express.json());

// third party middleware
server.use(helmet());
server.use(morgan("dev"));

// custom routing middleware
// server.use("/api/zoos", zooRoutes);
// server.use("/api/bears", bearRoutes);
server.use("/", rootRoute);

// custom error-handling middleware
server.use(errorRouter);

module.exports = server;
