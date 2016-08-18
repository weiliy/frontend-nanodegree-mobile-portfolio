'use strict';

var gulp = require('gulp');
var htmlmin = require('gulp-htmlmin');
var csso = require('gulp-csso');
var uglify = require('gulp-uglify');
var clean = require('gulp-clean');
var jshint = require('gulp-jshint');    
var sequence = require('gulp-sequence');
var autoprefixer = require('gulp-autoprefixer');

var paths = {
  html: '*.html',
  js: './js/*.js',
  css: 'css/*.css',
  img: 'img/*'
};

var view = {
  html: {
    src: 'views/*.html',
    dest: 'build/views'
  },
  js: { 
    src: 'views/js/*.js',
    dest: 'build/views/js'
  },
  css: {
    src: 'views/css/*.css',
    dest: 'build/views/css'
  },
  img: { 
    src: 'views/images/*',
    dest: 'build/views/images'
  }
}

gulp.task('html', function() {
  return gulp.src(paths.html)
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest('build/'));
});

gulp.task('html2', function() {
  return gulp.src(view.html.src)
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest(view.html.dest));
});

gulp.task('js', function() {
  return gulp.src(paths.js)
    .pipe(jshint())
    .pipe(jshint.reporter('default')) 
    .pipe(jshint.reporter('fail'))
    .pipe(uglify())
    .pipe(gulp.dest('build/js/'));
});

gulp.task('js2', function() {
  return gulp.src(view.js.src)
    .pipe(jshint())
    .pipe(jshint.reporter('default')) 
    .pipe(jshint.reporter('fail'))
    .pipe(uglify())
    .pipe(gulp.dest(view.js.dest));
});

gulp.task('css', function() {
  return gulp.src(paths.css)
    .pipe(autoprefixer({
      browsers: ['last 2 versions'],
      cascade: false}))
    .pipe(csso())
    .pipe(gulp.dest('build/css'));
});

gulp.task('css2', function() {
  return gulp.src(view.css.src)
    .pipe(autoprefixer({
      browsers: ['last 2 versions'],
      cascade: false}))
    .pipe(csso())
    .pipe(gulp.dest(view.css.dest));
});

gulp.task('img', function() {
  return gulp.src(paths.img)
    .pipe(gulp.dest('build/img/'));
});

gulp.task('img2', function() {
  return gulp.src(view.img.src)
    .pipe(gulp.dest(view.img.dest));
});

gulp.task('clean', function() { 
  return gulp.src('build/', {read: false})
    .pipe(clean());
});

gulp.task('view', ['html2', 'js2', 'css2', 'img2']);

gulp.task('watch', function() {
  gulp.watch(paths.html, ['html']);
  gulp.watch(paths.js, ['js']);
  gulp.watch(paths.css, ['css']);
  gulp.watch(paths.img, ['img']);

  gulp.watch(view.html.src, ['html2']);
  gulp.watch(view.js.src, ['js2']);
  gulp.watch(view.css.src, ['css2']);
  gulp.watch(view.img.src, ['img2']);
});

gulp.task('build', ['html','js', 'css', 'img', 'view']);

gulp.task('default', sequence('clean', 'build'));
