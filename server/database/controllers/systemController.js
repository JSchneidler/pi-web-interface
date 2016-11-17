var _ = require('lodash');
var async = require('async');
var shell = require('shelljs');

// async.reflect "Wraps the function in another function that always returns data even when it errors." - http://caolan.github.io/async/docs.html#reflect
var getIP = async.reflect(function(callback) {
	shell.exec('curl ipecho.net/plain', { silent: true }, function(code, stdout, stderr) {
		callback(null, { ip: stdout });
	});
});

var getUptime = async.reflect(function(callback) {
	shell.exec('uptime', { silent: true }, function(code, stdout, stderr) {
		results = stdout.split(',');

		callback(null, { uptime: results[0].substr(1) });
	});
});

var getHostname = async.reflect(function(callback) {
	shell.exec('hostname', { silent: true }, function(code, stdout, stderr) {
		callback(null, { hostname: stdout });
	});
});

module.exports = {
	index: function(req, res) {

		// Do each in parallel, run callback when all are complete
		async.parallel([
			getIP,
			getUptime
		], function(err, results) {
			response = {};

			// Append each result to response if it didn't return an error
			_.each(results, function(result) {
				if (result.error) return;
				_.assign(response, result.value);
			});

			res.pass(response);
		});

	},

	hostname: function(req, res) {

		async.parallel([
			getHostname
		], function(err, results) {
			response = {};

			_.each(results, function(result) {
				if (result.error) return;
				_.assign(response, result.value);
			});

			res.pass(response);

		});
	},

	files: function(req, res) {
		shell.cd('~');
		var files = shell.ls('/');

		res.pass(files);
	}
};
