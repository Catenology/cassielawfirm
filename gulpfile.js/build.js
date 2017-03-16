const gulp = require('gulp');
const exec = require('child_process').exec;

gulp.task('build', ['scripts'], (cb) => {
    //jekyll build the site
    exec(['jekyll b --source src --destination _site'], (err, stdout, stderr) => {
        console.log(stdout);
        console.log(stderr);
        cb(err);
    })
});
