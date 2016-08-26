(function () {
    'use strict';

    angular.module('acc')
        .factory('jugListService', jugListService);

    function jugListService(storageService) {

        return {
            getJugList: getJugList,
            addJug: addJug,
            removeJug: removeJug
        };

        function getJugList() {
            return storageService.getJugList();
        }

        function addJug(jugToAdd) {
            var jugList = storageService.getJugList();

            if (!Array.isArray(jugList)) {
                jugList = [];
            }

            jugList.push(jugToAdd);
            storageService.setJugList(jugList);
        }

        function removeJug(jugIndex) {
            var jugList = storageService.getJugList();
            jugList.splice(jugIndex, 1);

            storageService.setJugList(jugList);
        }
    }
})();