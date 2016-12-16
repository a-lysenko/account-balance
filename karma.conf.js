module.exports = function(config) {
    config.set({
        basePath: '',
        frameworks: ['jasmine'],
        files: [
            'public/libs/js-shortid/dist/js-shortid.js',
            'node_modules/angular/angular.js',
            'node_modules/angular-mocks/angular-mocks.js',
            'public/libs/angular-local-storage/dist/angular-local-storage.js',
            'public/libs/angular-ui-router/release/angular-ui-router.js',
            'public/libs/angular-animate/angular-animate.js',
            'public/libs/angular-bootstrap/ui-bootstrap.js',
            'public/libs/angular-bootstrap/ui-bootstrap-tpls.js',
            'src/components/**/*.module.js',
            'src/components/**/*.route.js',
            'src/components/**/*.constants.js',
            'src/components/**/*.service.js',
            'src/components/**/*.ctrl.js',
            'src/components/**/*.directive.js',
            'src/components/**/*.spec.js'
        ],
        autoWatch: true,
        browsers: ['PhantomJS'],
        singleRun: false,
        autoWatchBatchDelay: 500,
        reporters: ['progress', 'coverage'],
        preprocessors: {
            'src/components/**/*!(spec).js': ['coverage'],
            'src/js/**/*!(spec).js': ['coverage']
        }

    });
};