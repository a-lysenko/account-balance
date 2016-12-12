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
                setTurnover: setTurnover,
                getLatestTurnoverItem: getLatestTurnoverItem
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

            function getLatestTurnoverItem() {
                var latestTurnoverItem = null;
                var turnover = localStorageService.get(dataKeys.turnover);
                if (angular.isArray(turnover) && turnover.length) {
                    latestTurnoverItem = turnover[turnover.length - 1];
                }

                return latestTurnoverItem;
            }
        });
})();