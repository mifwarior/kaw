var gulp = require('gulp');
var minify = require('gulp-minify');
var concat = require('gulp-concat');

const closureCompiler = require('google-closure-compiler').gulp();

gulp.task('build-inject', function() {
  gulp.src('./inject/*.js')
  .pipe(concat("bundle.js"))
  .pipe(minify())
  .pipe(gulp.dest('inject-bulid'));
});


gulp.task('js-compile', function () {
  return gulp.src('./inject/**/*.js', {base: './'})
      .pipe(closureCompiler({
          compilation_level: 'SIMPLE',
          warning_level: 'VERBOSE',
          language_in: 'ECMASCRIPT7_STRICT',
          language_out: 'ECMASCRIPT5_STRICT',
          output_wrapper: '(function(){\n%output%\n}).call(this)',
          js_output_file: 'output.min.js',
          debug: true
        }, {
          platform: ['native', 'java', 'javascript']
        }))
      .pipe(gulp.dest('./inject-bulid'));
});