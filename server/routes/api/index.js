var express = require('express');
var router = express.Router();

// GET /api
router.get('/', function(req, res) {
  console.log(res.io);
	res.pass('Welcome to the API');
});

module.exports = router;
