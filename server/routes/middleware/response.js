var express = require('express');
var router = express.Router();

router.use(function(req, res, next) {	

  // Standard for successful requests
	res.pass = function(data, status_code) {
		status_code = status_code || 200;
		res.status(status_code).json({ success: true, data: data });
	}

  // Standard for unsuccessful requests
	res.fail = function(data, status_code) {
		status_code = status_code || 500;
		res.status(status_code).json({ success: false, data: data });
	}

	next();
});

module.exports = router;
