(function () {
    'use strict';

    angular.module('acc')
        .factory('storageService', function (localStorageService) {
            var mockedData = [
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
            localStorageService.set('balanceIncome', mockedData);

            return {
                getBalanceIncome: getBalanceIncome
            };

            function getBalanceIncome() {
              return localStorageService.get('balanceIncome');
            }
        });
})();