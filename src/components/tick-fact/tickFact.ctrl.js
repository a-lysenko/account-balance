(function () {
    'use strict';

    angular.module('acc')
        .controller('TickFactController', TickFactController);

    function TickFactController(localStorageService, tickFactDataKey) {
        const ctrl = this;
        angular.extend(ctrl, {
            tickFactData: [],

            saveTickFact: saveTickFact
        });

        ctrl.$onInit = function () {
            // TODO - on real request to server it can be sent on controller creation
            // and just its promise should processed in $onInit
            ctrl.tickFactData = localStorageService.get(tickFactDataKey);
            console.log('ctrl.tickFactData', ctrl.tickFactData);
        };

        function saveTickFact() {
            console.log('saveTickFact called');
        }
    }
})();