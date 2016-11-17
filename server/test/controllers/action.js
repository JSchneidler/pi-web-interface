var chai = require('chai');

var expect = chai.expect;

var config = require('../../config')

var Action = require(config.server.dbPath + '/models/actionModel');
var actionController = require(config.server.dbPath + '/controllers/actionController');

describe('action', function() {
	it('should be invalid if name is empty', function(done) {
		var action = new Action();

		action.validate(function(error) {
			expect(error.errors.name).to.exist;
			done();
		});
	});

	it('should be valid if name is provided', function(done) {
		var action = new Action();
		action.name = 'test';

		action.validate(function(error) {
			expect(error).to.not.exist;
			done();
		});
	});
});