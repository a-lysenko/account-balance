(function () {
    'use strict';

    angular.module('acc')
        .controller('TickPlanController', TickPlanController);

    function TickPlanController($state, round2, tickPlanService) {
        const ctrl = this;

        angular.extend(ctrl, {
            //isTickNew: false,
            tickPlanData: {},
            tickPlanMenuData: {},
            commonSpread: [],

            saveTickPlan,
            handlePlannedValueChange,
            updateUnspread
        });

        ctrl.$onInit = function () {
            const tickPlanDataQ = tickPlanService.getTickPlanData({
                isTickNew: ctrl.isTickNew,
                id: $state.params.id
            });

            tickPlanDataQ.then((tickPlanData) => {
                ctrl.tickPlanData = tickPlanData;
                console.log('ctrl.tickPlanData', ctrl.tickPlanData);

                ctrl.tickPlanMenuData = tickPlanService.retrievePlanMenuDataFrom(ctrl.tickPlanData);

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

            updateUnspread();
        }

        function updatePlannedValue(plannedValue) {
            plannedValue = round2(plannedValue);
            ctrl.tickPlanData.plannedValue = plannedValue;
            ctrl.tickPlanMenuData.plannedValue = plannedValue;
        }

        // TODO - rename to what it does
        function updateUnspread() {
            //const spread = tickPlanService.compilePlannedDataSpread(
            //    ctrl.tickPlanData.spread,
            //    ctrl.commonSpread
            //);
            //
            //const spreadSum = calculateSpreadSum(spread);
        }

        function calculateSpreadSum(spread) {
            const spreadSum = spread.reduce((acc, spreadItem) => {
                return acc + spreadItem.plannedValue;
            }, 0);

            return round2(spreadSum);
        }
    }
})();