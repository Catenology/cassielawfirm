'use strict';

const gulp = require('gulp');
const util = require('gulp-util');
const minimist = require('minimist');
const ftp = require('vinyl-ftp');

const deployargs = minimist(process.argv.slice(2));
const conn = ftp.create({
  host: deployargs.host,
  user: deployargs.user,
  password: deployargs.password,
  log: util.log,
});

gulp.task('cleanremote', () => conn.rmdir('cassielawfirm'));
