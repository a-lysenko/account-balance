(function () {
    'use strict';

    angular.module('acc')
        .factory('storageService', function (localStorageService) {
            var dataKeys = {
                jugList: 'jugList',
                turnover: 'turnover'
            };

            return {
                getJugList: getJugList,
                setJugList: setJugList,
                getTurnover: getTurnover,
                setTurnover: setTurnover
            };

            function getJugList() {
                return localStorageService.get(dataKeys.jugList);
            }

            function setJugList(jugList) {
                localStorageService.set(dataKeys.jugList, jugList);
            }

            function getTurnover() {
                return localStorageService.get(dataKeys.turnover);
            }

            function setTurnover(turnover) {
                localStorageService.set(dataKeys.turnover, turnover);
            }
        });
})();