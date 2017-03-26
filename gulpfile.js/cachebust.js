'use strict';

const gulp = require('gulp');
const replace = require('gulp-replace');

const timestamp = Math.round(Date.now() / 1000);

gulp.task('cachebust', ['build'], () => gulp.src(['./_site/**/*.html', './_site/**/*.md', './_site/**/*.markdown'])
    .pipe(replace(/@@hash/g, timestamp))
    .pipe(gulp.dest('./_site')));
