var express = require('express');
var router = express.Router();

// Attach middleware
router.use(function(req, res, next) {	

	res.pass = function(data, status_code) {
		status_code = status_code || 200;
		res.status(status_code).json({ success: true, data: data });
	}

	res.fail = function(data, status_code) {
		status_code = status_code || 500;
		res.status(status_code).json({ success: false, data: data });
	}

	next();
});

// GET /api
router.get('/', function(req, res) {
	res.pass('Welcome to the API');
});

module.exports = router;
