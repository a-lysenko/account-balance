(function () {
    'use strict';

    angular.module('acc')
        .controller('SetBalanceController', SetBalanceController);

    function SetBalanceController($state, turnoverService) {
        var vm = this;

        angular.extend(vm, {
            balance: [],
            itemToBalance: getEmptyIncomeItem(),

            addItemToBalance: addItemToBalance,
            removeItem: removeItem,
            saveExpense: saveExpense
        });

        function addItemToBalance() {
            var itemCopy = angular.extend({}, vm.itemToBalance);
            vm.balance.push(itemCopy);

            vm.itemToBalance = getEmptyIncomeItem();
        }

        function removeItem(itemIndex) {
            vm.balance.splice(itemIndex, 1);
        }

        function saveExpense() {
            var turnoverExpense = new turnoverService.Expense(vm.balance);
            turnoverService.addTurnoverItem(turnoverExpense);

            $state.go('turnover');
        }

        function getEmptyIncomeItem() {
            return {
                source: '',
                UAH: 0,
                USD: 0
            }
        }
    }
})();