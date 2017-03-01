(function () {
    'use strict';
    angular.module('acc')
        .run(function (localStorageService, shortid,
                       tickPlanDataKey) {
            console.info('Mock tickPlan data included in build due to "src/mock/**/*.mock.js" pattern.');

            localStorageService.set(tickPlanDataKey, {
                id: shortid.gen(),
                plannedValue: 12345.67,
                spreadValue: 1234.5,
                unspreadValue: 123.45,
                spreadPercent: 12.34,
                unspreadPercent: 56.78,
                factedPercent: 46,
                factedId: shortid.gen(),
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