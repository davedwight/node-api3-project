const express = require('express');
const path = require('path');
const server = express();

// remember express by default cannot parse JSON in request bodies
server.use(express.json());
server.use(express.static(path.join(__dirname, 'client/')));

// global middlewares and the user's router need to be connected here
const usersRouter = require('./users/users-router');
const {
  logger,
  notFound,
  errorHandling,
} = require('./middleware/middleware');

server.use('/', logger);

server.use('/api/users', usersRouter);

server.get('/', logger, (req, res, next) => { // eslint-disable-line
  res.send(`<h2>Let's write some middleware!</h2>`);
});

server.get('/api', (req, res) => {
  console.log(req);
  res.json({
      message: "successfully deployed",
  })
});

server.use('*', notFound);

server.use(errorHandling);

module.exports = server;
