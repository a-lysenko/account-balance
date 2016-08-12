(function () {
    'use strict';

    angular.module('acc')
        .controller('AddIncomeController', AddIncomeController);

    function AddIncomeController($state, turnoverService) {
        var vm = this;
        angular.extend(vm, {
            income: [],
            itemToIncome: getEmptyIncomeItem(),
            addItemToIncome: addItemToIncome,
            removeItem: removeItem,
            saveIncome: saveIncome
        });

        function addItemToIncome() {
            var itemCopy = angular.extend({}, vm.itemToIncome);
            vm.income.push(itemCopy);

            vm.itemToIncome = getEmptyIncomeItem();
        }

        function removeItem(itemIndex) {
            vm.income.splice(itemIndex, 1);
        }

        function getEmptyIncomeItem() {
            return {
                source: '',
                UAH: 0,
                USD: 0
            }
        }
        
        function saveIncome() {
            var turnoverIncome = turnoverService.createIncome(vm.income);
            turnoverService.addTurnoverItem(turnoverIncome);

            $state.go('balance-income');
        }
    }
})();