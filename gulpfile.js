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
const cleancss = require('gulp-clean-css');
const concat = require('gulp-concat');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');

let deployargs = minimist(process.argv.slice(2));
let conn = ftp.create({
    host: deployargs.host,
    user: deployargs.user,
    password: deployargs.password,
    log: util.log
});
let timestamp = Math.round(Date.now() / 1000);

gulp.task('default', ['cachebust']);

gulp.task('clean', () => {
    return del(['dist']);
});

gulp.task('zip', ['build'], () => {
    let fszip = gulp.src('dist/_site/**')
        .pipe(zip(`v${timestamp}.zip`))
        .pipe(gulp.dest('dist/_site/files'));
    return fszip;
});

gulp.task('build', ['scripts'], (cb) => {
    //jekyll build the site
    exec(['jekyll b --source src --destination dist/_site'], function(err, stdout, stderr) {
        console.log(stdout);
        console.log(stderr);
        cb(err);
    })
});

//add timestamp to static assets to bust cache
gulp.task('cachebust', ['build'], () => {
    let fscachebust = gulp.src(['dist/_site/**/*.html', 'dist/_site/**/*.md', 'dist/_site/**/*.markdown'])
        .pipe(replace(/@@hash/g, timestamp))
        .pipe(gulp.dest('dist/_site'))
    return fscachebust;
});

//ftp deployment
gulp.task('deploy', ['cleanremote'], () => {
    let globs = ['dist/_site/**/*.*'];
    let fsdeploy = gulp.src(globs, {
            buffer: false
        })
        .pipe(conn.dest('cassielawfirm'));
    return fsdeploy;
})

//clean remote folder on ftp server
gulp.task('cleanremote', (cb) => {
    return conn.rmdir('cassielawfirm', function(err) {
        cb();
    });
});

//compile stylesheet
gulp.task('styles', ['clean'], () => {
  let vendor = gulp.src(['src/css/_vendor/*.css'])
  .pipe(cleancss())
  .pipe(concat('vendor.min.css'))
  .pipe(gulp.dest('src/css'));
  return vendor;
});

//compile javascript
gulp.task('scripts', ['styles'], () => {
  let vendor = gulp.src(['src/js/_vendor/*.js'])
  .pipe(uglify())
  .pipe(concat('vendor.min.js'))
  .pipe(gulp.dest('src/js'));

  let main = gulp.src(['src/js/_main.js'])
  .pipe(babel({
      presets: ['es2015']
  }))
  .pipe(uglify())
  .pipe(rename('main.min.js'))
  .pipe(gulp.dest('src/js'));

  return merge(vendor, main);
});
