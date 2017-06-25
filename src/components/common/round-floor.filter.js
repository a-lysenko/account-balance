(function () {
    'use strict';
    angular.module('acc')
        .filter('roundFloor', roundFloorFilter);

    function roundFloorFilter() {
        return roundFloor;

        function roundFloor(value) {
            return Math.floor(value);
        }
    }
})();