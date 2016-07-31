module.exports = function(config) {
    config.set({
        basePath: '',
        frameworks: ['jasmine'],
        files: [
            'node_modules/angular/angular.js',
            'node_modules/angular-mocks/angular-mocks.js',
            'node_modules/angular-local-storage/dist/angular-local-storage.js',
            'public/components/**/*.module.js',
            'public/components/**/*.js',
            'public/**/*.spec.js'
        ],
        autoWatch: true,
        browsers: ['PhantomJS'],
        singleRun: false
    });
};