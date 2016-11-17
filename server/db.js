var mongoose = require('mongoose');

var config = require('./config'); // ./config.js

function connect() {
	mongoose.connect(config.db.prod_url, function(err) {
	  if (err) {
	    console.error('Could not connect to MongoDB.');
	    return;
	  }
	  console.log('Connected to MongoDB.');
	});

	return {
		"test": 2
	};
}

module.exports = connect;