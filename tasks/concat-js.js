var gulp = require('gulp');
var concat = require('gulp-concat');
var sourcemaps = require('gulp-sourcemaps');
var watch = require('gulp-watch');

function concatJS(config) {
    gulp.src(config.srcFiles)
        .pipe(sourcemaps.init())
        .pipe(concat(config.outFile, {newLine: ';'}))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest(config.dist));
}

module.exports = (config) => {
    function exec() {
        concatJS(config);
    }

    return {
        exec: exec,
        watch: () => {
            watch(config.srcFiles, exec);
        }
    }
};


