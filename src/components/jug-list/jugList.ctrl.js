(function () {
    'use strict';

    angular.module('acc')
        .controller('JugListController', JugListController);

    function JugListController(jugListService) {
        var vm = this;

        angular.extend(vm, {
            jugList: jugListService.getJugList(),
            jugToAdd: clearJugToAdd(),

            addJugToList: addJugToList,
            removeJugFromList: removeJugFromList
        });

        function addJugToList() {
            jugListService.addJug(vm.jugToAdd);
            clearJugToAdd();
            vm.jugList = jugListService.getJugList();
        }

        function removeJugFromList(jugIndex) {
            jugListService.removeJug(jugIndex);
            vm.jugList = jugListService.getJugList();
        }

        function clearJugToAdd() {
            vm.jugToAdd = {
                name: '',
                percent: 0
            };
        }
    }
})();