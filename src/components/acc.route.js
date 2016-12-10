(function () {
    'use strict';

    angular.module('acc')
        .config(function ($stateProvider, $urlRouterProvider) {
            $urlRouterProvider
                .otherwise('/');

            $stateProvider
                .state('jug-list', {
                    url: "/jug-list",
                    template: '<jug-list></jug-list>'
                })
                .state('add-income', {
                    url: "/add-income",
                    templateUrl: 'add-income/add-income.html',
                    controller: 'AddIncomeController',
                    controllerAs: 'vm'
                })
                .state('turnover', {
                    url: "/",
                    // TODO - remove balance income directive and use controller here directly
                    // TODO - but previously check if you just can use property 'component'.
                    //        if yes - transform the directive to component and use the approach
                    template: '<turnover>Here is turnover directive</turnover>'
                });
        });
})();