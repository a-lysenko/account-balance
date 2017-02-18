(function () {
    'use strict';

    angular.module('acc')
        .directive('tickDesk', tickDesk);

    function tickDesk() {
        return {
            restrict: 'E',
            scope: {},
            templateUrl: 'tick-desk/tickDesk.html',
            replace: false
        }
    }
})();