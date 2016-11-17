var chai = require('chai');

var expect = chai.expect;

var Action = require(require('../../config').server.dbPath + '/models/actionModel');

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