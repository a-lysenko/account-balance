(function () {
    'use strict';

    angular.module('acc')
        .controller('SpreadController', SpreadController);

    function SpreadController(round2) {
        const ctrl = this;

        angular.extend(ctrl, {
            spread: [],

            handleSpreadItemValueChange
        });

        ctrl.$onInit = function () {

        };

        ctrl.$onChanges = function (changes) {
            console.log('changes', changes);
            console.log('ctrl.spread', ctrl.spread);
        };

        function handleSpreadItemValueChange() {
            const spreadSum = calculateSpreadSum(ctrl.spread);

            recalculateSpreadPercents(spreadSum);

            ctrl.handleSpreadItemChange({
                summary: spreadSum
            });
        }

        function updateSpreadItemPercent(item, spreadSum) {
            item.percent = round2(item.value / spreadSum * 100);
        }

        function recalculateSpreadPercents(spreadSum) {
            ctrl.spread.forEach((item) => {
                updateSpreadItemPercent(item, spreadSum);
            });
        }

        function calculateSpreadSum(spread) {
            return spread.reduce((acc, spreadItem) => {
                return acc + spreadItem.value;
            }, 0);
        }
    }
})();