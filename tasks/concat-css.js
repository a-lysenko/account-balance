const gulp = require('gulp');
const sass = require('gulp-sass');
const concat = require('gulp-concat');
const sourcemaps = require('gulp-sourcemaps');

const config = require('./config').style;
const taskName = 'concat-css';

function concatCSS() {
    //var srcFilePath = [config.src, config.file].join('/');

    gulp.src(config.src)
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(concat(config.outFile))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest(config.dist));

    // TODO - change text after resolving gulp tasks
    console.log(`Task "${taskName}": on its way.`);
}

module.exports = {
    exec: concatCSS,
    pattern: config.watchPattern,
    name: taskName
};