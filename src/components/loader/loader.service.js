(function () {
    'use strict';
    angular.module('acc')
        .factory('loaderService', loaderService);

    function loaderService() {
        let action = angular.noop;
        let spinnerCounter = 0;

        return {
            registerAction,
            show,
            hide
        };

        function registerAction(actionToRegister) {
            console.log('action registered. actionToRegister', actionToRegister);
            console.log('action registered. spinnerCounter', spinnerCounter);
            
            action = actionToRegister;
        }

        function show() {
            spinnerCounter++;

            console.log('#show spinnerCounter', spinnerCounter);

            action(!!spinnerCounter);
        }

        function hide() {
            spinnerCounter--;

            console.log('#hide spinnerCounter', spinnerCounter);

            if (!spinnerCounter) {
                action(false);
            }
        }
    }
})();