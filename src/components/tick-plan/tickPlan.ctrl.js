(function () {
    'use strict';

    angular.module('acc')
        .controller('TickPlanController', TickPlanController);

    function TickPlanController($state, round2, tickPlanService) {
        const ctrl = this;

        angular.extend(ctrl, {
            //isTickNew: false,
            tickPlanData: {},
            commonSpread: [],

            saveTickPlan,
            handlePlannedValueChange,
            updatePlannedValue
        });

        ctrl.$onInit = function () {
            const tickPlanDataQ = tickPlanService.getTickPlanData({
                isTickNew: ctrl.isTickNew,
                id: $state.params.id
            });

            tickPlanDataQ.then((tickPlanData) => {
                ctrl.tickPlanData = tickPlanData;
                console.log('ctrl.tickPlanData', ctrl.tickPlanData);

                // TODO - it is not todo. This approach let user have a fallback changes
                ctrl.commonSpread = tickPlanService.buildCommonSpread(ctrl.tickPlanData.spread);
            });
        };

        function saveTickPlan() {
            const options = {
                isTickNew: ctrl.isTickNew,
                id: $state.params.id
            };

            ctrl.tickPlanData.spread = tickPlanService.compilePlannedDataSpread(
                ctrl.tickPlanData.spread,
                ctrl.commonSpread
            );

            tickPlanService.saveTick(options, ctrl.tickPlanData)
                .then((resData) => {
                    console.log('resData', resData);
                    $state.go('tick-desk');
                });
        }

        function handlePlannedValueChange(plannedValue) {
            console.log('handlePlannedValueChange call', plannedValue);
            updatePlannedValue(plannedValue);
        }

        function updatePlannedValue(summary) {
            summary = round2(summary);
            ctrl.tickPlanData.plannedValue = summary;
        }
    }
})();