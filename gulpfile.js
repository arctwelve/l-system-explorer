/*
 * Gulp file for l-system-explorer. jshints, concats and minifies css and watches for changes
 * related to those tasks while running.
 */
var gulp = require('gulp');


// include task plugins
var jshint = require('gulp-jshint');
var concat = require('gulp-concat');
var rename = require('gulp-rename');
var cleanCSS = require('gulp-clean-css');


// jshint task
gulp.task('jshint', function () {
    return gulp.src('js/app/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});


// concatenate + minify CSS
gulp.task('css-files', function () {
    return gulp.src('css/*.css')
        .pipe(cleanCSS())
        .pipe(concat('style.min.css'))
        .pipe(gulp.dest('css/production'))
});


// watch files for changes
gulp.task('watch', function () {
    gulp.watch('js/app/*.js', ['jshint']);
    gulp.watch('css/*.css', ['css-files']);
});


// default (all) task
gulp.task('default', ['jshint', 'css-files', 'watch']);
