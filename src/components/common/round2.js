(function () {
    'use strict';
    angular.module('acc')
        .factory('round2', round2Service);

    function round2Service() {
        return round2;

        function round2(value) {
            return Math.round(value * 100) / 100;
        }
    }
})();