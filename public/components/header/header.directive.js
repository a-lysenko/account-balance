(function () {
    'use strict';

    angular.module('acc')
        .directive('accHeader', accHeader);

    function accHeader() {
        return {
            restrict: 'E',
            scope: {},
            templateUrl: 'components/header/header.html',
            replace: true
        }
    }
})();
