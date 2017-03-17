(function () {
    'use strict';

    angular.module('acc')
        .controller('TickPlanController', TickPlanController);

    function TickPlanController($state, tickPlanService) {
        const ctrl = this;

        const tickPlanDataQ = tickPlanService.getTickPlanData($state.params.id);

        angular.extend(ctrl, {
            tickPlanData: [],
            tickPlanMenuData: {},

            saveTickPlan: saveTickPlan
        });

        ctrl.$onInit = function () {
            tickPlanDataQ.then((tickPlanData) => {
                ctrl.tickPlanData = tickPlanData;
                console.log('ctrl.tickPlanData', ctrl.tickPlanData);

                ctrl.tickPlanMenuData = tickPlanService.retrievePlanMenuDataFrom(ctrl.tickPlanData);
            });
        };

        function saveTickPlan() {
            console.log('saveTickPlan called');
        }
    }
})();