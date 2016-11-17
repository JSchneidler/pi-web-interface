var express = require('express');
var router = express.Router();

var config = require('../config'); // ~/server/config.js

// GET /*
router.all('/*', function(req, res) {
	// Send angular master file
	res.sendFile('index.html', { root: config.server.distFolder });
});

module.exports = router;
