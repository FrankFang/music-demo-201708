var gulp = require('gulp');
var del = require('del');
var postcss = require('gulp-postcss');
const babel = require('gulp-babel');
var minify = require('gulp-minify');




gulp.task('rm', function() {
  return del(['dist/**']);
});

gulp.task('css', ['rm'], function () {
  var postcss      = require('gulp-postcss');
  var sourcemaps   = require('gulp-sourcemaps');
  var autoprefixer = require('autoprefixer');

  return gulp.src('./src/*.css')
    .pipe(sourcemaps.init())
    .pipe(postcss([autoprefixer()]))
    .pipe(sourcemaps.write('.'))
  // dest: destination 目的地
  // dist: distribution 发布
    .pipe(gulp.dest('./dist'));
});
gulp.task('css-watch', function () {
  var postcss      = require('gulp-postcss');
  var sourcemaps   = require('gulp-sourcemaps');
  var autoprefixer = require('autoprefixer');

  return gulp.src('./src/*.css')
    .pipe(sourcemaps.init())
    .pipe(postcss([autoprefixer()]))
    .pipe(sourcemaps.write('.'))
  // dest: destination 目的地
  // dist: distribution 发布
    .pipe(gulp.dest('./dist'));
});


gulp.task('js', ['rm'], () =>
  gulp.src('src/*.js')
  .pipe(babel({
    presets: ['env']
  }))
  .pipe(minify({noSource: true,ext:{ min:'.js'}}))
  .pipe(gulp.dest('dist'))
);
gulp.task('js-watch', () =>
  gulp.src('src/*.js')
  .pipe(babel({
    presets: ['env']
  }))
  .pipe(minify({noSource: true,ext:{ min:'.js'}}))
  .pipe(gulp.dest('dist'))
);

gulp.task('default', ['rm', 'css', 'js'])

gulp.task('watch', function(){
  var watcher1 = gulp.watch('src/**/*.js', ['js-watch']);
  watcher1.on('change', function(event) {
    console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
  });
  var watcher2 = gulp.watch('src/**/*.css', ['css-watch']);
  watcher2.on('change', function(event) {
    console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
  });
})
