module.exports = function(config) {
    config.set({
        basePath: '',
        frameworks: ['jasmine'],
        files: [
            'node_modules/angular/angular.js',
            'node_modules/angular-mocks/angular-mocks.js',
            'public/libs/angular-local-storage/dist/angular-local-storage.js',
            'public/libs/angular-ui-router/release/angular-ui-router.js',
            'public/libs/angular-animate/angular-animate.js',
            'public/libs/angular-bootstrap/ui-bootstrap.js',
            'public/libs/angular-bootstrap/ui-bootstrap-tpls.js',
            'src/components/**/*.module.js',
            'src/components/**/*.route.js',
            'src/components/**/*.service.js',
            'src/components/**/*.ctrl.js',
            'src/components/**/*.directive.js',
            //'src/components/**/*.js',
            'src/components/jug-list/jugList.ctrl.spec.js'
            //'src/**/*.spec.js'
        ],
        autoWatch: true,
        browsers: ['PhantomJS'],
        singleRun: true,
        reporters: ['progress', 'coverage'],
        preprocessors: {
            'src/components/**/*!(spec).js': ['coverage'],
            'src/js/**/*!(spec).js': ['coverage']
        }

    });
};