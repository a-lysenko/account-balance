(function () {
    'use strict';

    angular.module('acc')
        .controller('AddIncomeController', AddIncomeController);

    function AddIncomeController() {
        var vm = this;
        angular.extend(vm, {
            income: [],
            itemToIncome: getEmptyIncomeItem(),
            addItemToIncome: addItemToIncome,
            removeJugFromList: removeJugFromList
        });

        function addItemToIncome() {
            var itemCopy = angular.extend({}, vm.itemToIncome);
            vm.income.push(itemCopy);

            vm.itemToIncome = getEmptyIncomeItem();
        }

        function removeJugFromList() {

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