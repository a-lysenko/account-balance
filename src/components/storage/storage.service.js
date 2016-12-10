(function () {
    'use strict';

    angular.module('acc')
        .factory('storageService', function (localStorageService) {
            var dataKeys = {
                balanceIncome: 'balanceIncome',
                jugList: 'jugList',
                turnover: 'turnover'
            };

            // TODO - remove mockedBalanceIncomeData from storage service
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
            localStorageService.set(dataKeys.balanceIncome, mockedBalanceIncomeData);

            return {
                getBalanceIncome: getBalanceIncome,
                getJugList: getJugList,
                setJugList: setJugList,
                getTurnover: getTurnover,
                setTurnover: setTurnover
            };

            function getBalanceIncome() {
              return localStorageService.get(dataKeys.balanceIncome);
            }

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