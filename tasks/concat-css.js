var gulp = require('gulp');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var sourcemaps = require('gulp-sourcemaps');

var config = require('./config').style;
var srcFilePath = [config.src, config.file].join('/');

gulp.src(srcFilePath)
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(concat(config.outFile))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest(config.dist));