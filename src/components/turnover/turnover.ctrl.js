(function () {
    'use strict';

    angular.module('acc')
        .controller('TurnoverController', TurnoverController);

    function TurnoverController(turnoverService) {
        var vm = this;
        angular.extend(vm, {
            turnoverData: turnoverService.getBasicTurnover()
        });
    }
})();