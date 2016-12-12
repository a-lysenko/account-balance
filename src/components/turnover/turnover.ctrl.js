(function () {
    'use strict';

    angular.module('acc')
        .controller('TurnoverController', TurnoverController);

    function TurnoverController(turnoverService) {
        var vm = this;
        angular.extend(vm, {
            turnoverData: []
        });

        var basicTurnover = turnoverService.getBasicTurnover();
        vm.turnoverData = decorateToView(basicTurnover);

        function decorateToView(basicTurnover) {
            basicTurnover.forEach(function (turnoverItem) {
                turnoverItem.income = turnoverService.isIncome(turnoverItem);
                turnoverItem.expense = turnoverService.isExpense(turnoverItem);
            });

            return basicTurnover;
        }
    }
})();