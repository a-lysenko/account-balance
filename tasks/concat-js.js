const gulp = require('gulp');
const concat = require('gulp-concat');
const sourcemaps = require('gulp-sourcemaps');

const config = require('./config').js;
const taskName = 'concat-js';

function concatJS() {
    gulp.src(config.srcFiles)
        .pipe(sourcemaps.init())
        .pipe(concat(config.outFile, {newLine: ';'}))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest(config.dist))
        .on('end', () => {
            console.log(`Task "${taskName}": done.`);
        });
}

module.exports = {
    exec: concatJS,
    pattern: config.watchPattern,
    name: taskName
};


