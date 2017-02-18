(function () {
    'use strict';

    angular.module('acc')
        .controller('TickDeskController', TickDeskController);

    function TickDeskController() {
        const ctrl = this;
        angular.extend(ctrl, {
            addTick: addTick
        });

        function addTick() {
            console.log('addTick called');
        }
    }
})();