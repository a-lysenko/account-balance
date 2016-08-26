var gulp = require('gulp');
var templateCache = require('gulp-angular-templatecache');
var watch = require('gulp-watch');

function cacheTemplates(config) {
    gulp.src(config.src)
        .pipe(templateCache(config.outFile, {module: config.moduleName}))
        .pipe(gulp.dest(config.dist));
}

module.exports = (config) => {
    function exec() {
        cacheTemplates(config);
    }

    return {
        exec: exec,
        watch: () => {
            watch(config.src, exec);
        }
    }
};