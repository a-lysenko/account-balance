(function () {
    'use strict';

    angular.module('acc')
        .component('spread', {
            bindings: {
                spread: '<',
                handleSpreadChange: '&'
            },
            templateUrl: 'spread/spread.html',
            controller: 'SpreadController',
            controllerAs: '$ctrl'
        });
})();