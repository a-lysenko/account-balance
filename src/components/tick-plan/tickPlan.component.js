(function () {
    'use strict';

    angular.module('acc')
        .component('tickPlan', {
            bindings: {
              isTickNew: '<'
            },
            templateUrl: 'tick-plan/tickPlan.html',
            controller: 'TickPlanController',
            controllerAs: '$ctrl'
        });
})();