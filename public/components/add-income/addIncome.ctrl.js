(function () {
    'use strict';

    angular.module('acc')
        .controller('AddIncomeController', AddIncomeController);

    function AddIncomeController() {
        var vm = this;
        angular.extend(vm, {
            income: []
        })
    }
})();