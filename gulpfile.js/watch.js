const gulp = require('gulp');
const browsersync = require('browser-sync').create();
const reload = browsersync.reload;

gulp.task('watch', ['cachebust'], () => {
  browsersync.init({
        server: {
            baseDir: './_site/'
        }
    });
  gulp.watch('src/**', ['build']);
});
