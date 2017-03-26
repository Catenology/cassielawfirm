'use strict';

const gulp = require('gulp');
const zip = require('gulp-zip');

const timestamp = Math.round(Date.now() / 1000);

gulp.task('zip', ['build'], () => gulp.src('./_site/**')
    .pipe(zip(`v${timestamp}.zip`))
    .pipe(gulp.dest('./_site/files')));
