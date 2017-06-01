(function () {
    'use strict';

    angular.module('acc')
        .component('spread', {
            bindings: {
                spread: '<',
                usePlannedValueByItem: '<',
                handleSpreadItemChange: '&onSpreadItemChange'
            },
            templateUrl: 'spread/spread.html',
            controller: 'SpreadController',
            controllerAs: '$ctrl'
        });
})();