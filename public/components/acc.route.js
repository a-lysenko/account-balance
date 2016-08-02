(function () {
    'use strict';

    angular.module('acc')
        .config(function ($stateProvider, $urlRouterProvider) {
            $urlRouterProvider
                .otherwise('/');

            $stateProvider
                .state('jug-list', {
                    url: "/jug-list",
                    templateUrl: 'jug-list.html'
                })
                .state('balance-income', {
                    url: "/",
                    // TODO - remove balance income directive and use controller here directly
                    template: '<balance-income>Here is balance-income directive</balance-income>'
                });
        });
})();