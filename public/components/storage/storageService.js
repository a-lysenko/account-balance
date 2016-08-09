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

            var mockedJugListData = [
                {
                    name: 'Common',
                    percent: 53.4
                },
                {
                    name: 'Reserve',
                    percent: 12.6
                }
            ];
            localStorageService.set('jugList', mockedJugListData);

            return {
                getBalanceIncome: getBalanceIncome,
                getJugList: getJugList,
                addJugToList: addJugToList
            };

            function getBalanceIncome() {
              return localStorageService.get('balanceIncome');
            }

            function getJugList() {
                return localStorageService.get('jugList');
            }

            function addJugToList(jugToAdd, say) {
                var key = 'jugList';
                var jugList = localStorageService.get(key);

                if (say) {
                    console.log('got jugList', jugList);
                }

                if (!Array.isArray(jugList)) {
                    jugList = [];

                    if (say) {
                        console.log('modified jugList', jugList);
                    }
                }

                jugList.push(jugToAdd);
                    console.log('jugList to store', jugList);
                localStorageService.set(key, jugList);
            }
        });
})();