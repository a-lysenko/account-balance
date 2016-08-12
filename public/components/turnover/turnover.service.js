(function () {
    'use strict';

    angular.module('acc')
        .factory('turnoverService', turnoverService);

    function turnoverService() {
        return {
            createIncome: createIncome
        };

        function createIncome() {
            return {}
        }
    }
})();