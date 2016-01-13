// Require Internal Files
var packageJSON = require('./package');
var assets = require('./assetsfiles.json');
var jshintConfig = packageJSON.jshintConfig;

// Require Npm Modules
var gulp = require('gulp');
var flatten = require('gulp-flatten');
var clean = require('gulp-clean');
var uglify = require('gulp-uglify');
var beautify = require('gulp-beautify');
var gulpif = require('gulp-if');
var merge = require('merge-stream');
var minifyCss = require('gulp-minify-css');
var jshint = require('gulp-jshint');
var stylish = require('jshint-stylish');
var argv = require('yargs').argv;
var fs = require('fs');
var decompress = require('gulp-decompress');
var download = require("gulp-download");

// Clean assets folder
gulp.task('clean-assets', function () {
    return gulp.src(['assets/libs', 'assets/css/*', 'assets/fonts', '!assets/css/app.css', '!assets/css/template.css'])
        .pipe(clean());
});

// Clean Build
gulp.task('clean-build', function () {
    return gulp.src(['build/*'])
        .pipe(clean());
});

gulp.task('assets', function(){
	var css = gulp.src(assets.css.files)
	  	.pipe(gulp.dest(assets.css.dest))

	var fonts = gulp.src(assets.fonts.files)
	  	.pipe(gulp.dest(assets.fonts.dest))

	var libs = gulp.src(assets.libs.files, { base: 'bower_components/' })
  		.pipe(flatten({ includeParents: 1 }))
  	  	.pipe(gulp.dest(assets.libs.dest))

	return merge(css, fonts, libs);
});

gulp.task('build', ['clean-build'], function(){
	return gulp.src(['../app/**/*.*','../assets/**/*.*','../index.html', '../main.js'], { cwd: 'app/', base: './' })
	    .pipe(gulpif(gulpif('app/**/*.js', jshint(jshintConfig)))) //jsHint será aplicado somente nos arquivos do projeto.
        .pipe(gulpif(jshint.reporter(stylish)))
        .pipe(gulpif(jshint.reporter('fail')))
		.pipe(gulpif('*.js', uglify()))
		.pipe(gulpif('*.css', minifyCss()))
		.pipe(gulp.dest('build/'))
});

//jsHint será aplicado somente nos arquivos do projeto.
gulp.task('jshint', function() {
	return gulp.src(['**/*.*'], { cwd: 'app/', base: './' })
	    .pipe(gulpif('app/**/*.js', jshint(jshintConfig)))
        .pipe(jshint.reporter(stylish))
});

gulp.task('clean-releases', function () {
    return gulp.src(['releases/*'])
        .pipe(clean());
});

gulp.task('newVersion', ['clean-releases'], function(){
    return download('https://github.com/mateusmcg/bigdata-search/releases/download/1.0.0-AI/mateusmcg-angular-table-restful-0.0.1-0-g47f6579.zip')
        .pipe(gulp.dest('releases'))
        .pipe(decompress({strip: 1}))
        .pipe(gulp.dest('releases/decompress'))
})
