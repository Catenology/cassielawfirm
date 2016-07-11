'use strict'
const gulp = require('gulp');
const del = require('del');
const util = require('gulp-util');
const zip = require('gulp-zip');
const ftp = require('vinyl-ftp');
const minimist = require('minimist');
const rename = require('gulp-rename');
const exec = require('child_process').exec;
const replace = require('gulp-replace');
const merge = require('merge-stream');

let deployargs = minimist(process.argv.slice(2));
let conn = ftp.create({
  host: deployargs.host,
  user: deployargs.user,
  password: deployargs.password,
  log: util.log
});
let timestamp = Math.round(Date.now() / 1000);

gulp.task('default', ['cachebust','zip']);

gulp.task('clean', () => {
  return del(['src/_site', 'dist']);
});

gulp.task('zip', ['build'], () => {
  let fszip = gulp.src('src/_site/**')
  .pipe(zip(`v${timestamp}.zip`))
  .pipe(gulp.dest('dist'));
  return fszip;
});

gulp.task('build', ['clean'], (cb) => {
    //jekyll build the site
    exec(['jekyll b --source src --destination src/_site'], function(err, stdout, stderr) {
        console.log(stdout);
        console.log(stderr);
        cb(err);
    })
});

//add timestamp to static assets to bust cache
gulp.task('cachebust', ['build'], ()=>{
  let fscachebust = gulp.src(['src/_site/**/*.html','src/_site/**/*.md','src/_site/**/*.markdown'])
  .pipe(replace(/@@hash/g, timestamp))
  .pipe(gulp.dest('src/_site'))
  return fscachebust;
});

//ftp deployment
gulp.task('deploy', ['cleanremote'], ()=>{
  let fsdeploy = gulp.src('src/_site/**/*.*')
  .pipe(conn.dest('beta/cassielawfirm'));
  return fsdeploy;
})

//clean remote folder on ftp server
gulp.task('cleanremote', (cb) => {
    return conn.rmdir('beta/cassielawfirm', function(err) {
        cb();
    });
});
