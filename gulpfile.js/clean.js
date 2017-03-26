'use strict';

const gulp = require('gulp');
const del = require('del');

gulp.task('clean', () => del(['./_site', 'src/css/_vendor/**/catfw.*', 'src/css/fonts/**/catif.*', 'src/css/vendor.min.css', 'src/js/_vendor/**', 'src/js/vendor.min.js']));