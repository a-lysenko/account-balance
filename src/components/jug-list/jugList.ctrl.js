(function () {
    'use strict';

    angular.module('acc')
        .controller('JugListController', JugListController);

    function JugListController(jugListService) {
        var vm = this;

        angular.extend(vm, {
            jugList: jugListService.getJugList()
        });
    }
})();