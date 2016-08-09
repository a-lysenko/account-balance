(function () {
    'use strict';

    angular.module('acc')
        .controller('JugListController', JugListController);

    function JugListController(storageService) {
        var vm = this;

        angular.extend(vm, {
            jugList: storageService.getJugList()
        });
    }
})();