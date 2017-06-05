(function () {
    'use strict';

    angular.module('acc')
        .component('loader', {
            templateUrl: 'loader/loader.html',
            controller: LoaderController,
            controllerAs: '$ctrl'
        });

    function LoaderController(loaderService) {
            const ctrl = this;

             angular.extend(ctrl, {
                showLoader: false
            });
            
            loaderService.registerAction((showLoader) => {
                ctrl.showLoader = showLoader;
            });
        }
})();