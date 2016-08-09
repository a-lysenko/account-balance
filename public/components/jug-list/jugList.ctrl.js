(function () {
    'use strict';

    angular.module('acc')
        .controller('JugListController', JugListController);

    function JugListController(storageService) {
        var vm = this;

        angular.extend(vm, {
            jugList: storageService.getJugList(),
            jugToAdd: {
                name: '',
                percent: 0
            },

            addJug: addJug
        });

        function addJug() {
            storageService.addJugToList(vm.jugToAdd);
            clearJugToAdd();
            vm.jugList = storageService.getJugList();
        }

        function clearJugToAdd() {
            vm.jugToAdd.name = '';
            vm.jugToAdd.percent = 0;
        }
    }
})();