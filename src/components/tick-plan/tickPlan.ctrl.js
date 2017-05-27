(function () {
    'use strict';

    angular.module('acc')
        .controller('TickPlanController', TickPlanController);

    function TickPlanController($state, round2, tickPlanService) {
        const ctrl = this;

        angular.extend(ctrl, {
            //isTickNew: false,
            tickPlanData: [],
            tickPlanMenuData: {},

            saveTickPlan,
            handlePlannedValueChange,
            handleSpreadItemValueChange,
            handleSpreadItemPercentChange
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
            });
        };

        function saveTickPlan() {
            const options = {
                isTickNew: ctrl.isTickNew,
                id: $state.params.id
            };

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

            ctrl.tickPlanData.spread.forEach((item) => {
                updateSpreadItemPercent(item);
            });
        }

        function handleSpreadItemValueChange(item) {
            updateSpreadItemPercent(item);
            updateUnspread();
        }

        function handleSpreadItemPercentChange(item) {
            updateSpreadItemValue(item);
            updateUnspread();
        }

        function updatePlannedValue(plannedValue) {
            plannedValue = round2(plannedValue);
            ctrl.tickPlanData.plannedValue = plannedValue;
            ctrl.tickPlanMenuData.plannedValue = plannedValue;
        }

        function updateUnspread() {
            const spreadSum = calculateSpreadSum();
            const unspreadValue = ctrl.tickPlanMenuData.plannedValue - spreadSum;
            const unspread = {
                unspreadValue: round2(unspreadValue),
                unspreadPercent: round2(unspreadValue / ctrl.tickPlanMenuData.plannedValue * 100)
            };

            // It is not applied for one-way binding without copying
            ctrl.tickPlanMenuData = angular.extend({}, ctrl.tickPlanMenuData, unspread);
        }

        function updateSpreadItemValue(item) {
            item.plannedValue = round2(ctrl.tickPlanData.plannedValue * item.plannedPercent / 100);
        }

        function updateSpreadItemPercent(item) {
            item.plannedPercent = round2(item.plannedValue / ctrl.tickPlanData.plannedValue * 100);
        }

        function calculateSpreadSum() {
            const {spread} = ctrl.tickPlanData;
            const spreadSum = spread.reduce((acc, spreadItem) => {
                return acc + spreadItem.plannedValue;
            }, 0);

            return round2(spreadSum);
        }
    }
})();