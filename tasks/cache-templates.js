var gulp = require('gulp');
var templateCache = require('gulp-angular-templatecache');

var config = require('./config').templates;

gulp.src(config.src)
    .pipe(templateCache(config.outFile, {module: config.moduleName}))
    .pipe(gulp.dest(config.dist));