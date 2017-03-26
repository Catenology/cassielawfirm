'use strict'
const gulp = require('gulp');
const timestamp = Math.round(Date.now() / 1000);
const replace = require('gulp-replace');

gulp.task('cachebust', ['build'], () => {
    return gulp.src(['./_site/**/*.html', './_site/**/*.md', './_site/**/*.markdown'])
        .pipe(replace(/@@hash/g, timestamp))
        .pipe(gulp.dest('./_site'));
});
