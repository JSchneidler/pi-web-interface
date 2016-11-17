var gulp = require('gulp');
var debug = require('gulp-debug');
var sass = require('gulp-sass');
var del = require('del');
var mocha = require('gulp-mocha');
var chai = require('chai');
var mongoose = require('mongoose');

var config = require('./config');

var client = '../client/';

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

	return gulp.src('test/**/*.js', {read: false})
		.pipe(mocha());
});

gulp.task('clean', function() {
	//return gulp.src([client + 'dist/**/*',  '!' + client + 'dist/components', '!' + client + 'dist/components/**'], { read: false })
		//.pipe(clean({ force: true }));
	return del([
		client + 'dist/**/*',
		'!' + client + 'dist/components',
		'!' + client + 'dist/components/**/*'
	], { force: true });
});

gulp.task('sass', ['clean'], function() {
	return gulp.src(client + 'sass/**/*.scss')
		.pipe(sass().on('error', sass.logError))
		.pipe(gulp.dest(client + 'dist/css'));
});

gulp.task('copy:angular', ['clean'], function() {
	return gulp.src(client + 'angular/**/*')
		.pipe(gulp.dest(client + 'dist/angular'));
});

gulp.task('copy:index', ['clean'], function() {
	return gulp.src(client + 'index.html')
		.pipe(gulp.dest(client + 'dist'));
});

gulp.task('test', ['mocha']);
gulp.task('build', ['sass', 'copy:index', 'copy:angular']);
