const gulp = require('gulp');
const rename = require('gulp-rename');
const browserify = require('browserify');
const source = require('vinyl-source-stream');

gulp.task('scripts', () => (
  browserify('src/js/_main.js')
    .transform('babelify', {
      presets: ['es2015'],
    })
    .bundle()
    .pipe(source('_main.js'))
    .pipe(rename('main.min.js'))
    .pipe(gulp.dest('src/js'))
));
