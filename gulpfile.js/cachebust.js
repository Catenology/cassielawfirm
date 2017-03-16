'use strict'
const gulp = require('gulp');
const timestamp = Math.round(Date.now() / 1000);
const replace = require('gulp-replace');

gulp.task('cachebust', ['build'], () => {
    return gulp.src(['src/_site/**/*.html', 'src/_site/**/*.md', 'src/_site/**/*.markdown'])
        .pipe(replace(/@@hash/g, timestamp))
        .pipe(gulp.dest('src/_site'));
});
