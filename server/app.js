// Set env variables
require('dotenv').config();

var express = require('express');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var path = require('path');
var mongoose = require('mongoose');
var io = require('socket.io')();


// Attach config to global
global.config = require('./config');

// Custom Modules
var db = require('./db')(mongoose).connect();

// Create app from express
var app = express();

// Setup Socket.IO
app.io = io; // Attach io to app so it can be attached to server
require('./sockets/init')(io); // Delegate socket logic to separate area

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(config.distPath, 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(config.distPath));

// Middleware
app.use('/api', require('./routes/middleware/response.js'));
app.use('/api', require('./routes/middleware/socket-io.js')(io));
// Use routes
app.use('/api', require('./routes/api/index')); // Serve 'api_index' from /api
app.use('/api/action', require('./routes/api/action')); // Server 'api_action' from /api
app.use('/', require('./routes/angular')); // Serve 'angular' from /

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (config.env === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.json({
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.json({
    message: err.message,
    error: {}
  });
});

// Export application
module.exports = app;
