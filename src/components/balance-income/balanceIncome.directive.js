(function () {
    'use strict';

    angular.module('acc')
        .directive('balanceIncome', balanceIncome);

    function balanceIncome() {
        return {
            restrict: 'E',
            scope: {},
            templateUrl: 'balance-income/balance-income.html',
            controller: 'BalanceIncomeController',
            controllerAs: 'vm',
            bindToController: true,
            replace: true
        }
    }
})();
