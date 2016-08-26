(function () {
    'use strict';

    angular.module('acc')
        .directive('accHeader', accHeader);

    function accHeader() {
        return {
            restrict: 'E',
            scope: {},
            templateUrl: 'header/header.html',
            replace: true
        }
    }
})();
