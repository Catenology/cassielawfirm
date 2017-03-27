'use strict';

const gulp = require('gulp');
const browsersync = require('browser-sync').create();

const reload = browsersync.reload;

gulp.task('watch', ['build'], () => {
  browsersync.init({
    server: {
      baseDir: './_site/',
    },
  });
  gulp.watch('src/_sass/*.scss', ['styles', 'build']);
  gulp.watch('src/js/*.js', ['scripts']);
  gulp.watch('src/**/*.{html, markdown, md}', ['build']);
  gulp.watch('_site/**').on('change', reload);
});
