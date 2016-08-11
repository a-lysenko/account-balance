(function () {
    'use strict';

    angular.module('acc')
        .factory('storageService', function (localStorageService) {
            var mockedBalanceIncomeData = [
                {
                    date: '2016-05-11',
                    isIncome: false,
                    sum: {
                        UAH: 123.45,
                        USD: 768.09
                    },
                    jug: 'jug2016-05-11_01'
                },
                {
                    date: '2016-05-12',
                    isIncome: true,
                    sum: {
                        UAH: 123.45,
                        USD: 768.09
                    },
                    jug: 'jug2016-05-12_01'
                },
                {
                    date: '2016-05-13',
                    isIncome: false,
                    sum: {
                        UAH: 123.45,
                        USD: 768.09
                    },
                    jug: null
                }
            ];
            localStorageService.set('balanceIncome', mockedBalanceIncomeData);

            return {
                getBalanceIncome: getBalanceIncome,
                getJugList: getJugList,
                addJugToList: addJugToList,
                removeJug: removeJug
            };

            function getBalanceIncome() {
              return localStorageService.get('balanceIncome');
            }

            function getJugList() {
                return localStorageService.get('jugList');
            }

            function addJugToList(jugToAdd) {
                var key = 'jugList';
                var jugList = localStorageService.get(key);

                if (!Array.isArray(jugList)) {
                    jugList = [];
                }

                jugList.push(jugToAdd);
                localStorageService.set(key, jugList);
            }

            function removeJug(jugIndex) {
                
            }
        });
})();