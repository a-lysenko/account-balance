(function () {
    'use strict';

    angular.module('acc')
        .controller('BalanceIncomeController', BalanceIncomeController);

    function BalanceIncomeController(storageService) {
        var vm = this;
        angular.extend(vm, {
            balanceIncomeData: storageService.getBalanceIncome()
        });

    }
})();