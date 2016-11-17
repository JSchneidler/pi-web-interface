var Action = require('../models/actionModel');

/**
 * actionController.js
 *
 * @description :: Server-side logic for managing actions.
 */
module.exports = {

    /**
     * actionController.list()
     */
    list: function (req, res) {
        Action.find(function (err, actions) {
            if (err) {
		return res.fail({
                    message: 'Error when getting action.',
                    error: err
                });
            }
            return res.pass(actions);
        });
    },

    /**
     * actionController.show()
     */
    show: function (req, res) {
        var id = req.params.id;
        Action.findOne({_id: id}, function (err, action) {
            if (err) {
                return res.fail({
                    message: 'Error when getting action.',
                    error: err
                });
            }
            if (!action) {
                return res.fail({
                    message: 'No such action'
                }, 400);
            }
            return res.pass(action);
        });
    },

    /**
     * actionController.create()
     */
    create: function (req, res) {
        var action = new Action({
			name : req.body.name,
			params : req.body.params,
			user_id : req.body.user_id
        });

        action.save(function (err, action) {
            if (err) {
                return res.fail({
                    message: 'Error when creating action',
                    error: err
                });
            }
            return res.pass(action, 201);
        });
    },

    /**
     * actionController.update()
     */
    update: function (req, res) {
        var id = req.params.id;
        Action.findOne({_id: id}, function (err, action) {
            if (err) {
                return res.fail({
                    message: 'Error when getting action',
                    error: err
                });
            }
            if (!action) {
                return res.fail({
                    message: 'No such action'
                }, 400);
            }

            action.name = req.body.name ? req.body.name : action.name;
			action.params = req.body.params ? req.body.params : action.params;
			action.user_id = req.body.user_id ? req.body.user_id : action.user_id;
			
            action.save(function (err, action) {
                if (err) {
                    return res.fail({
                        message: 'Error when updating action.',
                        error: err
                    });
                }

                return res.pass(action);
            });
        });
    },

    /**
     * actionController.remove()
     */
    remove: function (req, res) {
        var id = req.params.id;
        Action.findByIdAndRemove(id, function (err, action) {
            if (err) {
                return res.fail({
                    message: 'Error when deleting the action.',
                    error: err
                });
            }
            return res.pass({}, 204);
        });
    }
};
