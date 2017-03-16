'use strict'
const gulp = require('gulp');
const uglify = require('gulp-uglify');
const concat = require('gulp-concat');
const babel = require('gulp-babel');
const rename = require('gulp-rename');
const merge = require('merge-stream');

gulp.task('scripts', ['styles'], () => {
  let vendor = gulp.src(['src/js/_vendor/*.js'])
  .pipe(uglify())
  .pipe(concat('vendor.min.js'))
  .pipe(gulp.dest('src/js'));

  let main = gulp.src(['src/js/_main.js'])
  .pipe(babel({
      presets: ['es2015']
  }))
  .pipe(uglify())
  .pipe(rename('main.min.js'))
  .pipe(gulp.dest('src/js'));

  return merge(vendor, main);
});
