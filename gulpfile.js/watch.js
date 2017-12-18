const gulp = require('gulp');
const browsersync = require('browser-sync').create();

const { reload } = browsersync;

gulp.task('watch', ['build'], () => {
  browsersync.init({
    server: {
      baseDir: './dist/',
    },
  });
  gulp.watch('src/_sass/*.scss', ['styles', 'build']);
  gulp.watch('src/js/*.js', ['scripts']);
  gulp.watch('src/**/*.{html, markdown, md}', ['build']);
  gulp.watch('dist/**').on('change', reload);
});
