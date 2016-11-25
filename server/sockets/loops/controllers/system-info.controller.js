var _ = require('lodash');
var async = require('async');
var shell = require('shelljs');

// async.reflect "Wraps the function in another function that always returns data even when it errors." - http://caolan.github.io/async/docs.html#reflect
var getIP = async.reflect(function(callback) {
	shell.exec('curl ipecho.net/plain', { silent: true }, function(code, stdout, stderr) {
		callback(null, { ip: stdout });
	});
});

var getHostname = async.reflect(function(callback) {
	shell.exec('hostname', { silent: true }, function(code, stdout, stderr) {
		callback(null, { hostname: stdout });
	});
});

var getProcessInfo = async.reflect(function(callback) {
	shell.exec('top | grep "" -m 4', { silent: true }, function(code, stdout, stderr) {
    console.log(stdout);
		callback(null, { processInfo: stdout });
	});
});

var getUptime = function(done) {
	shell.exec('uptime', { silent: true }, function(code, stdout, stderr) {
		results = stdout.split(',');
    done({ uptime: results[0] });
	});
};

module.exports = function(io) {
  return {
    systemInfo: function() {
      async.parallel([ // Do each in parallel, run callback when all are complete
        getIP,
        getHostname
        //getProcessInfo
      ], function(err, results) {
        response = {};
        _.each(results, function(result) { // Append each result to response if it didn't return an error
          if (result.error) return;
          _.assign(response, result.value);
        });

        io.pass('global.info', response);
      });

    },	

    systemTime: function() {
      getUptime(done);

      function done(data) {
        io.pass('global.time', data);
      }
    },

    files: function() {
      shell.cd('~');
      var files = shell.ls('/');

      io.pass('global.files', files);
    }
  };
};
