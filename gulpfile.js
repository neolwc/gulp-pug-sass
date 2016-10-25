'use strict';

var gulp = require('gulp');
var pug = require('gulp-pug');
var sass = require('gulp-sass');
var autoprefixer = require('autoprefixer');
var browserSync = require('browser-sync').create();

var watch_path = 'tmp';

gulp.task('pug', function() {
  gulp.src('src/*.pug')
    .pipe(pug({pretty: true}))
    .pipe(gulp.dest(watch_path))
    .pipe(browserSync.stream({once: true}))
});

gulp.task('sass', function() {
  gulp.src('src/styles/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest(watch_path))
    .pipe(browserSync.stream())
});

gulp.task('watch', ['pug', 'sass'], function() {
  browserSync.init({
    host: process.env.IP || null,
    port: process.env.PORT || 3000,
    server: watch_path
  });

  gulp.watch('src/**/*.pug', ['pug']);
  gulp.watch("src/**/*.scss", ['sass']);
});