var express = require('express');
var router = express.Router();

// GET /*
router.all('/*', function(req, res) {
	// Send angular master file
	res.sendFile('index.html', { root: config.distPath });
});

module.exports = router;
