(function () {
    'use strict';

    angular.module('acc')
        .controller('SpreadController', SpreadController);

    function SpreadController(round2) {
        const ctrl = this;

        angular.extend(ctrl, {
            spread: [],

            handleSpreadItemValueChange,
            handleSpreadItemPercentChange
        });

        ctrl.$onInit = function () {

        };

        function handleSpreadItemValueChange(item) {
            updateSpreadItemPercent(item);

            // TODO - pass ctrl.spread
            ctrl.handleSpreadChange();
        }

        function handleSpreadItemPercentChange(item) {
            updateSpreadItemValue(item);

            // TODO - pass ctrl.spread
            ctrl.handleSpreadChange();
        }

        function updateSpreadItemValue(item) {
            // TODO - change basis - here is ctrl.tickPlanData.plannedValue - or remove method
            item.value = round2(ctrl.tickPlanData.plannedValue * item.percent / 100);
        }

        function updateSpreadItemPercent(item) {
            // TODO - change basis - here is ctrl.tickPlanData.plannedValue - or remove method
            item.percent = round2(item.value / ctrl.tickPlanData.plannedValue * 100);
        }
    }
})();