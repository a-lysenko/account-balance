(function () {
    'use strict';
    angular.module('acc')
        .run(function (localStorageService, shortid,
                       tickFactDataKey) {
            console.info('Mock tickFact data included in build due to "src/mock/**/*.mock.js" pattern.');

            localStorageService.set(tickFactDataKey, {
                id: shortid.gen(),
                plannedValue: 12345.67,
                factedValue: 1234.5,
                factedPercent: 12.34,
                leftValue: 123.45,
                leftPercent: 12.09,
                prevLeftValue: 123.4,
                spread: [
                    {
                        jugName: 'jug-' + shortid.gen().slice(-2),
                        jugDefaultPercent: 51,
                        jugValue: 4321.05,
                        jugPercent: 43.21
                    },
                    {
                        jugName: 'jug-' + shortid.gen().slice(-2),
                        jugDefaultPercent: 52,
                        jugValue: 4321.06,
                        jugPercent: 43.2
                    }
                ]
            })
        });
})();