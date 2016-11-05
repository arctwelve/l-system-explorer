// Include gulp
var gulp = require('gulp');


// Include Our Plugins
var jshint = require('gulp-jshint');
var concat = require('gulp-concat');
var rename = require('gulp-rename');
var cleanCSS = require('gulp-clean-css');


// JSHint Task
gulp.task('jshint', function () {
    return gulp.src('js/app/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});


// Concatenate & Minify CSS
gulp.task('css-files', function () {
    return gulp.src('css/*.css')
        .pipe(cleanCSS())
        .pipe(concat('style.min.css'))
        .pipe(gulp.dest('css/production'))
});


// Watch Files For Changes
gulp.task('watch', function () {
    gulp.watch('js/app/*.js', ['jshint']);
    gulp.watch('css/*.css', ['css-files']);
});


// Default Task
gulp.task('default', ['jshint', 'css-files', 'watch']);
