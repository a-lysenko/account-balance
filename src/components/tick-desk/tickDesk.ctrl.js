(function () {
    'use strict';

    angular.module('acc')
        .controller('TickDeskController', TickDeskController);

    function TickDeskController(localStorageService, tickDeskDataKey) {
        const ctrl = this;
        angular.extend(ctrl, {
            tickDeskData: [],

            addTick: addTick
        });

        ctrl.$onInit = function () {
            ctrl.tickDeskData = localStorageService.get(tickDeskDataKey);
            console.log('ctrl.tickDeskData', ctrl.tickDeskData);
        };

        function addTick() {
            console.log('addTick called');
        }
    }
})();