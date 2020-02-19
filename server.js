const express = require('express');
const server = express();

// imported __Router
const userRouter = require('./users/userRouter');
const postRouter = require('./posts/postRouter');

server.use(express.json());

server.use('/api/users', userRouter);

server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});

//custom middleware

function logger(req, res, next) {
  console.log()

  next();
}

module.exports = server;
