(function () {
    'use strict';

    angular.module('acc')
        .controller('TickPlanController', TickPlanController);

    function TickPlanController(tickPlanService) {
        const ctrl = this;
        // TODO - pass id here
        const tickPlanDataQ = tickPlanService.getTickPlanData();

        angular.extend(ctrl, {
            tickPlanData: [],

            saveTickPlan: saveTickPlan
        });

        ctrl.$onInit = function () {
            tickPlanDataQ.then((tickPlanData) => {
                ctrl.tickPlanData = tickPlanData;
                console.log('ctrl.tickPlanData', ctrl.tickPlanData);
            });
        };

        function saveTickPlan() {
            console.log('saveTickPlan called');
        }
    }
})();