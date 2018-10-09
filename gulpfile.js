var gulp = require('gulp');
var minify = require('gulp-minify');
var concat = require('gulp-concat');

gulp.task('build-inject', function() {
  gulp.src('./inject/*.js')
  .pipe(concat("bundle.js"))
  .pipe(minify())
  .pipe(gulp.dest('inject-bulid'));
});