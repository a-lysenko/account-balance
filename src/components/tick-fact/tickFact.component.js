(function () {
    'use strict';

    angular.module('acc')
        .component('tickFact', {
            templateUrl: 'tick-fact/tickFact.html',
            controller: 'TickFactController',
            controllerAs: '$ctrl'
        });
})();