const gulp = require('gulp');
const cleancss = require('gulp-clean-css');
const concat = require('gulp-concat');

gulp.task('styles', () => {
  const vendor = gulp.src(['src/css/_vendor/*.css'])
    .pipe(cleancss())
    .pipe(concat('vendor.min.css'))
    .pipe(gulp.dest('src/css'));
  return vendor;
});
