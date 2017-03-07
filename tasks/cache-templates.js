const gulp = require('gulp');
const templateCache = require('gulp-angular-templatecache');

const config = require('./config').templates;
const taskName = 'cache-templates';

function cacheTemplates() {
    gulp.src(config.src)
        .pipe(templateCache(config.outFile, {module: config.moduleName}))
        .pipe(gulp.dest(config.dist))
        .on('end', () => {
            console.log(`Task "${taskName}": done.`);
        });
}

module.exports = {
    exec: cacheTemplates,
    pattern: config.watchPattern,
    name: taskName
};