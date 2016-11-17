var async = require('async');
var shell = require('shelljs');

function getIP(callback) {
	shell.exec('curl ipecho.net/plain', { silent: true }, function(code, stdout, stderr) {
		callback(null, stdout);
	});
}

function getUptime(callback) {
	shell.exec('uptime', { silent: true }, function(code, stdout, stderr) {
		results = stdout.split(',');

		callback(null, results[0].substr(1));
	});
}

module.exports = {
	index: function(req, res) {

		async.parallel([
			getIP,
			getUptime
		], function(err, results) {
			if (err) return res.fail(err);

			res.pass(results);
		});

	},

	files: function(req, res) {
		shell.cd('/');
		var files = shell.ls('/');

		res.pass(files);
	}
};
