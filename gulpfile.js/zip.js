const gulp = require('gulp');
const zip = require('gulp-zip');

gulp.task('zip', ['build'], () => {
    return gulp.src('src/_site/**')
        .pipe(zip(`v${timestamp}.zip`))
        .pipe(gulp.dest('src/_site/files'));
});
