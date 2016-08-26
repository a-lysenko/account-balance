var gulp = require('gulp');
var concat = require('gulp-concat');

var config = require('./config').index;

gulp.src(config.src)
    .pipe(concat(config.outFile))
    .pipe(gulp.dest(config.dist));