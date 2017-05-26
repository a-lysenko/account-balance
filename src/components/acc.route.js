(function () {
    'use strict';

    angular.module('acc')
        .config(function ($stateProvider, $urlRouterProvider, $locationProvider) {
            $urlRouterProvider
                .otherwise('/tick-desk');

            $stateProvider
                .state('jug-list', {
                    url: "/jug-list",
                    template: '<jug-list></jug-list>'
                })
                .state('add-income', {
                    url: "/add-income",
                    templateUrl: '_obsolete/add-income/add-income.html',
                    controller: 'AddIncomeController',
                    controllerAs: 'vm'
                })
                .state('set-balance', {
                    url: "/set-balance",
                    templateUrl: '_obsolete/set-balance/set-balance.html',
                    controller: 'SetBalanceController',
                    controllerAs: 'vm'
                })

                .state('tick-desk', {
                    url: '/tick-desk',
                    // TODO - remove balance income directive and use controller here directly
                    // TODO - but previously check if you just can use property 'component'.
                    //        if yes - transform the directive to component and use the approach
                    template: '<tick-desk>Here is tick-desk directive</tick-desk>'
                })

                /* TODO -implement routing similar to described below
                 * parent state: tick-item (url: /tick/:id)
                 * nested state: tick-item.plan (url: /tick/:id/plan)
                 * nested state: tick-item.fact (url: /tick/:id/fact)
                 * nested state: tick-item.new (url: /tick/new)- new item*/
                /*.state('tick', {
                    url: '/tick/:id',
                    abstract: true,
                    // TODO - use to pass resolved tick, probably
                    //params: {
                    //  tickObj: {key: 'val'}
                    //},
                   /!* onEnter: function ($stateParams) {
                        console.log('State "tick" activated. id', $stateParams.id);
                        if ($stateParams.id === '314') {
                            $stateParams.id = 'new';
                            console.log('State "tick" changed id', $stateParams.id);
                        }
                    },*!/
                    template: '<ui-view />'
                    // TODO - in such manner a verification of id can be provided
                    //resolve: {
                    //    foo: function ($q, $timeout) {
                    //        const def = $q.defer();
                    //
                    //        $timeout(() => {
                    //            console.log('resolved');
                    //            def.resolve('foo val');
                    //        }, 2000);
                    //
                    //        return def.promise;
                    //    }
                    //}
                })*/
                .state('tick-new', {
                    url: '/tick-new',
                    template: '<tick-plan is-tick-new="true">Here is tick-plan directive</tick-plan>'
                })
                .state('tick-plan', {
                    url: '/tick/:id/plan',
                    template: '<tick-plan>Here is tick-plan directive</tick-plan>'
                })
                .state('tick-fact', {
                    url: '/tick/:id/fact',
                    template: '<tick-fact>Here is tick-fact directive</tick-fact>'
                });

            // use the HTML5 History API

            //$locationProvider.html5Mode({
            //    enabled: true,
            //    requireBase: false
            //});
        });
})();