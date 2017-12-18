const gulp = require('gulp');
const replace = require('gulp-replace');

const timestamp = Math.round(Date.now() / 1000);

gulp.task('cachebust', ['build'], () => gulp.src(['./dist/**/*.html', './dist/**/*.md', './dist/**/*.markdown'])
  .pipe(replace(/@@hash/g, timestamp))
  .pipe(gulp.dest('./dist')));
