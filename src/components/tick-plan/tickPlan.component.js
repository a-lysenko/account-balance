(function () {
    'use strict';

    angular.module('acc')
        .component('tickPlan', {
            templateUrl: 'tick-plan/tickPlan.html',
            controller: 'TickPlanController',
            controllerAs: '$ctrl'
        });
})();