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
            handlePlannedValueChange,
            handleSpreadItemValueChange,
            handleSpreadItemPercentChange
        });

        ctrl.isTickNew = tickPlanService.isTickNew($state.params.id);

        ctrl.$onInit = function () {
            tickPlanDataQ.then((tickPlanData) => {
                ctrl.tickPlanData = tickPlanData;
                console.log('ctrl.tickPlanData', ctrl.tickPlanData);

                ctrl.tickPlanMenuData = tickPlanService.retrievePlanMenuDataFrom(ctrl.tickPlanData);
            });
        };

        function saveTickPlan() {
            tickPlanService.saveNewTick(ctrl.tickPlanData)
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
            ctrl.tickPlanData.plannedValue = plannedValue;
            ctrl.tickPlanMenuData.plannedValue = plannedValue;
        }

        function updateUnspread() {
            const spreadSum = calculateSpreadSum();
            const unspreadValue = ctrl.tickPlanMenuData.plannedValue - spreadSum;
            const unspread = {
                unspreadValue,
                unspreadPercent: unspreadValue / ctrl.tickPlanMenuData.plannedValue * 100
            };

            // It is not applied for one-way binding without copying
            ctrl.tickPlanMenuData = angular.extend({}, ctrl.tickPlanMenuData, unspread);
        }

        function updateSpreadItemValue(item) {
            item.jugValue = ctrl.tickPlanData.plannedValue * item.jugPercent / 100;
        }

        function updateSpreadItemPercent(item) {
            item.jugPercent = item.jugValue / ctrl.tickPlanData.plannedValue * 100;
        }

        function calculateSpreadSum() {
            const {spread} = ctrl.tickPlanData;
            return spread.reduce((acc, spreadItem) => {
                return acc + spreadItem.jugValue;
            }, 0);
        }
    }
})();