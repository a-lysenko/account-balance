var gulp = require('gulp');
var concat = require('gulp-concat');
var sourcemaps = require('gulp-sourcemaps');

var config = require('./config').js;

gulp.src(config.srcFiles)
    .pipe(sourcemaps.init())
    .pipe(concat(config.outFile, {newLine: ';'}))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest(config.dist));