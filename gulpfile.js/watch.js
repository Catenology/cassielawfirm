'use strict'
const gulp = require('gulp');
const browsersync = require('browser-sync').create();
const reload = browsersync.reload;

gulp.task('watch', ['cachebust'], () => {
  browsersync.init({
        server: {
            baseDir: './_site/'
        }
    });
    gulp.watch('src/**/*.scss', ['styles']).on('change', reload);
    gulp.watch('src/**/*.js', ['scripts']).on('change', reload);
    gulp.watch('src/**/*.md', ['build']).on('change', reload);
});
