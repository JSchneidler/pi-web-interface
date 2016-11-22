var express = require('express');
var router = express.Router();

var systemController = require(config.__base + 'controllers/systemController'); 

// GET /api/system
router.get('/', systemController.systemInfo);
// GET /api/system/files
router.get('/files', systemController.files);

module.exports = router;
