'use strict';

var gulp = require('gulp');
var htmlmin = require('gulp-htmlmin');
var csso = require('gulp-csso');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var clean = require('gulp-clean');
    
var paths = {
  html: '*.html',
  js: './js/*.js',
  css: 'css/*.css',
  img: ['img/*', 'views/images/*']
};

gulp.task('html', function() {
  return gulp.src(paths.html)
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest('build/'));
});


gulp.task('js', function() {
  return gulp.src(paths.js)
    .pipe(gulp.dest('build/js'))
    .pipe(uglify())
    .pipe(rename({ extname: '.min.js' }))
    .pipe(gulp.dest('build/js/'));
});

gulp.task('css', function() {
  return gulp.src(paths.css)
    .pipe(csso())
    .pipe(gulp.dest('build/css'));
});

gulp.task('img', function() {
  return gulp.src(paths.img)
    .pipe(gulp.dest('build/img/'));
});

gulp.task('clean', function() { 
  return gulp.src('build/', {read: false})
    .pipe(clean());
});

gulp.task('watch', function() {
  gulp.watch(paths.html, ['html']);
  gulp.watch(paths.js, ['js']);
  gulp.watch(paths.css, ['css']);
  gulp.watch(paths.img, ['img']);
});

gulp.task('default', ['clean', 'html','js', 'css', 'img'])
