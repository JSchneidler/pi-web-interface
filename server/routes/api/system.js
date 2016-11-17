var express = require('express');
var router = express.Router();

var config = require('../../config');

var systemController = require(config.server.dbPath + '/controllers/systemController'); 

// GET /api/system
router.get('/', systemController.index);

router.get('/files', systemController.files);

module.exports = router;
