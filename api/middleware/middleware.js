const User = require('../users/users-model');
const Post = require('../posts/posts-model'); 

function logger(req, res, next) {
  console.log('req.method', req.method);
  console.log('req.url', req.url);
  console.log('req.timestamp', Date.now());
  next();
}

async function validateUserId(req, res, next) {
  try {
    const { id } = req.params;
    const user = await User.getById(id);
    if (user) {
      req.user = user;
      next();
    } else {
        next({
          status: 404,
          message: "user not found",
        })
    }
  } catch (err) {
    next(err);
  }
}

function validateUser(req, res, next) {
  if (!req.body.name) {
    next({
      status: 400,
      message: "missing required name field",
    });
  } else {
    next();
  }
}

function validatePost(req, res, next) {
  // DO YOUR MAGIC
}

const notFound = (req, res, next) => {
  res.status(404).json({
    message: 'not found, sorry!'
  })
}

const errorHandling = (err, req, res, next) => { // eslint-disable-line
  const status = err.status || 500
  res.status(status).json({
    message: err.message,
  })
}

// do not forget to expose these functions to other modules
module.exports = {
  logger,
  validateUserId,
  validateUser,
  validatePost,
  notFound,
  errorHandling,
}