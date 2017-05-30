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

        ctrl.$onChanges = function (changes) {
            console.log('changes', changes);
            console.log('ctrl.spread', ctrl.spread);

            if (changes.summary) {
                ctrl.spread.forEach((item) => {
                    updateSpreadItemPercent(item);
                });
            }
        };

        function handleSpreadItemValueChange(item) {
            updateSpreadItemPercent(item);
            ctrl.handleSpreadItemChange();
        }

        function handleSpreadItemPercentChange(item) {
            updateSpreadItemValue(item);
            ctrl.handleSpreadItemChange();
        }

        function updateSpreadItemValue(item) {
            item.value = round2(ctrl.summary * item.percent / 100);
        }

        function updateSpreadItemPercent(item) {
            item.percent = round2(item.value / ctrl.summary * 100);
        }
    }
})();