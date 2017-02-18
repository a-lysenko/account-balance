(function () {
    'use strict';

    angular.module('acc')
        .directive('tickDesk', tickDesk);

    function tickDesk() {
        return {
            restrict: 'E',
            scope: {},
            templateUrl: 'tick-desk/tickDesk.html',
            replace: false,
            controller: function () {
                const vm = this;
                angular.extend(vm, {
                    addTick: addTick
                });

                function addTick() {
                    console.log('addTick called');
                }
            },
            controllerAs: '$ctrl'
        }
    }
})();