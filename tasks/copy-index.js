var gulp = require('gulp');
var concat = require('gulp-concat');
var watch = require('gulp-watch');

function copyIndex(config) {
    gulp.src(config.src)
        .pipe(concat(config.outFile))
        .pipe(gulp.dest(config.dist));
}

module.exports = (config) => {
    function exec() {
        copyIndex(config);
    }

    return {
        exec: exec,
        watch: () => {
            watch(config.src, exec);
        }
    }
};