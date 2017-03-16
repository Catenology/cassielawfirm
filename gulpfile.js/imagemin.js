const gulp = require('gulp');
const imagemin = require('gulp-imagemin');

gulp.task('imagemin', () => {
  return gulp.src(['src/images/**/*.{png,svg,jpeg,jpg}'])
  .pipe(imagemin({
    verbose: true
  }))
  .pipe(gulp.dest('src/images'));
});
