(function () {
    'use strict';

    angular.module('acc')
        .controller('AddIncomeController', AddIncomeController);

    function AddIncomeController() {
        var vm = this;
        angular.extend(vm, {
            income: [],
            itemToIncome: getEmptyIncomeItem(),
            addItemToIncome: addItemToIncome
        });

        function addItemToIncome() {

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