(function () {
    'use strict';

    angular.module('acc')
        .controller('TickPlanController', TickPlanController);

    function TickPlanController($state, tickPlanService) {
        const ctrl = this;

        const tickPlanDataQ = tickPlanService.getTickPlanData($state.params.id);

        angular.extend(ctrl, {
            isTickNew: false,
            tickPlanData: [],
            tickPlanMenuData: {},

            saveTickPlan,
            updatePlannedValue
        });

        ctrl.isTickNew = tickPlanService.isTickNew($state.params.id);
        console.log('ctrl.isTickNew', ctrl.isTickNew);

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

        function updatePlannedValue(plannedValue) {
            ctrl.tickPlanData.plannedValue = plannedValue;
            ctrl.tickPlanMenuData.plannedValue = plannedValue;
            console.log('updated planned value', ctrl.tickPlanData.plannedValue);
        }
    }
})();