var gulp = require('gulp');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var watch = require('gulp-watch');
var sourcemaps = require('gulp-sourcemaps');


function concatCSS(config) {
    var srcFilePath = [config.src, config.file].join('/');

    gulp.src(srcFilePath)
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(concat(config.outFile))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest(config.dist));
}

module.exports = (config) => {
    function exec() {
        concatCSS(config);
    }

    return {
        exec: exec,
        watch: () => {
            watch(config.watchSrc, exec);
        }
    }
};