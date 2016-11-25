var express = require('express');
var router = express.Router();

module.exports = function(io) {
  router.use(function(req, res, next) {	
    // Attach socket io object to res object
    res.io = io;	

    next();
  });

  return router;
};
