(function () {
    'use strict';

    angular.module('acc')
        .component('tickDesk', {
            templateUrl: 'tick-desk/tickDesk.html',
            controller: 'TickDeskController',
            controllerAs: '$ctrl'
        });
})();