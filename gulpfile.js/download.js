'use strict';

const gulp = require('gulp');
const download = require('gulp-download');
const merge = require('merge-stream');

gulp.task('download', ['clean'], () => {
  const catfwcss = download('http://catfw.catenology.com/files/catfw.min.css')
      .pipe(gulp.dest('src/css/_vendor/'));

  const catfwfonts = download(['http://catfw.catenology.com/files/fonts/catif.ttf', 'http://catfw.catenology.com/files/fonts/catif.woff', 'http://catfw.catenology.com/files/fonts/catif.eot', 'http://catfw.catenology.com/files/fonts/catif.svg'])
      .pipe(gulp.dest('src/css/fonts'));

  const catfwjs = download('http://catfw.catenology.com/files/catfw.min.js')
      .pipe(gulp.dest('src/js/_vendor/'));

  const jquery = download('https://code.jquery.com/jquery-3.1.0.min.js')
      .pipe(gulp.dest('src/js/_vendor/'));
  const svg4everybody = download('https://raw.githubusercontent.com/jonathantneal/svg4everybody/master/dist/svg4everybody.min.js')
      .pipe(gulp.dest('src/js/_vendor/'));

  return merge(catfwcss, catfwfonts, catfwjs, jquery, svg4everybody);
});
