(function () {
    'use strict';

    angular.module('acc')
        .directive('turnover', turnover);

    function turnover() {
        return {
            restrict: 'E',
            scope: {},
            templateUrl: 'turnover/turnover.html',
            controller: 'TurnoverController',
            controllerAs: 'vm',
            bindToController: true,
            replace: true
        }
    }
})();
