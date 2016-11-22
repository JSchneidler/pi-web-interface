var express = require('express');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

// 3rd Party Modules
require('dotenv').config();
var path = require('path');
var mongoose = require('mongoose');

// Attach config to global
global.config = require('./config');

// Custom Modules
var db = require('./db')(mongoose).connect();

// Define routes
var angular = require('./routes/angular');
var api_index = require('./routes/api/index');
var api_action = require('./routes/api/action');
var api_system = require('./routes/api/system');

// Create app from express
var app = express();

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(config.distPath, 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(config.distPath));

app.use('/api', api_index) // Serve 'api_index' from /api
app.use('/api/action', api_action); // Server 'api_action' from /api
app.use('/api/system', api_system); // Serve 'api_system' from /api
app.use('/', angular); // Serve 'angular' from /

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
