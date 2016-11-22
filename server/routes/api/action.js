var express = require('express');
var router = express.Router();

var actionController = require(config.__base + 'controllers/actionController');

/*
 * GET
 */
router.get('/', actionController.list);

/*
 * GET
 */
router.get('/:id', actionController.show);

/*
 * POST
 */
router.post('/', actionController.create);

/*
 * PUT
 */
router.put('/:id', actionController.update);

/*
 * DELETE
 */
router.delete('/:id', actionController.remove);

module.exports = router;
