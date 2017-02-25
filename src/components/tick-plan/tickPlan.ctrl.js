(function () {
    'use strict';

    angular.module('acc')
        .controller('TickPlanController', TickPlanController);

    function TickPlanController(localStorageService, tickPlanDataKey) {
        const ctrl = this;
        angular.extend(ctrl, {
            tickPlanData: [],

            saveTickPlan: saveTickPlan
        });

        ctrl.$onInit = function () {
            // TODO - on real request to server it can be sent on controller creation
            // and just its promise should processed in $onInit
            ctrl.tickPlanData = localStorageService.get(tickPlanDataKey);
            console.log('ctrl.tickPlanData', ctrl.tickPlanData);
        };

        function saveTickPlan() {
            console.log('saveTickPlan called');
        }
    }
})();