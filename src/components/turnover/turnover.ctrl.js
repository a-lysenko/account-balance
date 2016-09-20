(function () {
    'use strict';

    angular.module('acc')
        .controller('TurnoverController', TurnoverController);

    function TurnoverController(storageService) {
        var vm = this;
        angular.extend(vm, {
            balanceIncomeData: storageService.getBalanceIncome()
        });

    }
})();