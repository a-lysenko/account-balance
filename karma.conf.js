module.exports = function(config) {
    config.set({
        basePath: '',
        frameworks: ['jasmine'],
        files: [
            'node_modules/angular/angular.js',
            'node_modules/angular-mocks/angular-mocks.js',
            'public/libs/angular-local-storage/dist/angular-local-storage.js',
            'public/libs/angular-animate/angular-animate.js',
            'public/libs/angular-bootstrap/ui-bootstrap.js',
            'public/libs/angular-bootstrap/ui-bootstrap-tpls.js',
            'public/components/**/*.module.js',
            'public/components/**/*.js',
            'public/**/*.spec.js'
        ],
        autoWatch: true,
        browsers: ['PhantomJS'],
        singleRun: false
    });
};