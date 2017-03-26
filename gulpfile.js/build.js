'use strict';

const gulp = require('gulp');
const exec = require('child_process').exec;

gulp.task('build', ['scripts'], (cb) => {
  exec(['jekyll b --source src --destination _site'], (err, stdout, stderr) => {
    console.log(stdout);
    console.log(stderr);
    cb(err);
  });
});
