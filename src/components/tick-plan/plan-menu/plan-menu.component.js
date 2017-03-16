(function () {
    'use strict';

    angular.module('acc')
        .component('planMenu', {
            templateUrl: 'tick-plan/plan-menu/planMenu.html',
            controller: 'PlanMenuController',
            controllerAs: '$ctrl',
            bindings: {
                tickPlanData: '<'
            }
        });
})();