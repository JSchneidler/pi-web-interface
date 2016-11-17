var gulp = require('gulp');
var mocha = require('gulp-mocha');
var chai = require('chai');
var mongoose = require('mongoose');

var config = require('./config');

gulp.task('mocha', function() {
	/*
	var db = mongoose.connect(config.db.prod_url, function(err) {
	  if (err) {
	    console.error('Could not connect to MongoDB.');
	    return;
	  }
	  console.log('Connected to MongoDB.');
	});
	*/

	gulp.src('test/**/*.js', {read: false})
		.pipe(mocha());
});

gulp.task('default', ['mocha']);