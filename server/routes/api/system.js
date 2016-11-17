var express = require('express');
var router = express.Router();

var config = require('../../config');

var systemController = require(config.server.dbPath + '/controllers/systemController'); 

// GET /api/system
router.get('/', systemController.index);
// GET /api/system/files
router.get('/files', systemController.files);
// GET /api/system/hostname
router.get('/hostname', systemController.hostname);

module.exports = router;
