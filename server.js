const express = require("express");
const server = express();
const morgan = require("morgan");

// custom middleware
const logger = require("./middleware/logger");

// imported __Router
const userRouter = require("./users/userRouter");
const postRouter = require("./posts/postRouter");

server.use(express.json());
server.use(logger("short")); // this is a Higher Order Function
// server.use(morgan("short"))

server.use("/api/users", userRouter);

server.get("/", (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});

module.exports = server;
