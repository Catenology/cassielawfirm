const gulp = require('gulp');
const { exec } = require('child_process');

gulp.task('build', ['scripts', 'styles'], () => {
  exec('jekyll b --source src --destination dist');
});
