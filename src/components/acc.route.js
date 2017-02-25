(function () {
    'use strict';

    angular.module('acc')
        .config(function ($stateProvider, $urlRouterProvider, $locationProvider) {
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
                .state('set-balance', {
                    url: "/set-balance",
                    templateUrl: 'set-balance/set-balance.html',
                    controller: 'SetBalanceController',
                    controllerAs: 'vm'
                })
                .state('tick-desk', {
                    url: '/',
                    // TODO - remove balance income directive and use controller here directly
                    // TODO - but previously check if you just can use property 'component'.
                    //        if yes - transform the directive to component and use the approach
                    template: '<tick-desk>Here is tick-desk directive</tick-desk>'
                })
                .state('tick-plan', {
                    url:'/tick-plan',
                    template: '<tick-plan>Here is tick-plan directive</tick-plan>'
                });

            // use the HTML5 History API

            //$locationProvider.html5Mode({
            //    enabled: true,
            //    requireBase: false
            //});
        });
})();