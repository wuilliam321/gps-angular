'use strict';

var path = require('path');
var gulp = require('gulp');
var conf = require('./conf');
var shell = require('gulp-shell');

gulp.task('baasbox-plugins', function () {
  return gulp.src(path.join(conf.paths.bbp, '/*.py'), {read: false})
    .pipe(shell([
      'python <%= file.path %>'
    ]))
})
