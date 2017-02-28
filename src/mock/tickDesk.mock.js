(function () {
    'use strict';
    angular.module('acc')
        .run(function (localStorageService, shortid,
                       tickDeskDataKey, tickPlanDataKey) {
            console.info('Mock tickDesk data included in build due to "src/mock/**/*.mock.js" pattern.');
            console.info('Mock tickPlan data included in build due to "src/mock/**/*.mock.js" pattern.');

            localStorageService.set(tickDeskDataKey, [
                {
                    id: shortid.gen(),
                    plannedDate: new Date(),
                    factedDate: new Date(),
                    plannedValue: 12345.67,
                    unspread: 1234.56,
                    factedPercent: 48,
                    tickStatus: 'great',
                    medals: [
                        {
                            icon: 'balancer',
                            title: 'Balancer'
                        },
                        {
                            icon: 'gold',
                            title: '3 good or better in row'
                        }
                    ]
                },
                {
                    id: shortid.gen(),
                    plannedDate: new Date(),
                    factedDate: new Date(),
                    plannedValue: 12345.67,
                    unspread: 1234.56,
                    factedPercent: 48,
                    tickStatus: 'good',
                    medals: [
                        {
                            icon: 'gold',
                            title: '3 good or better in row'
                        }
                    ]
                },
                {
                    id: shortid.gen(),
                    plannedDate: new Date(),
                    factedDate: new Date(),
                    plannedValue: 12345.67,
                    unspread: 1234.56,
                    factedPercent: 48,
                    tickStatus: 'poor',
                    medals: []
                },
                {
                    id: shortid.gen(),
                    plannedDate: new Date(),
                    factedDate: new Date(),
                    plannedValue: 12345.67,
                    unspread: 1234.56,
                    factedPercent: 48,
                    tickStatus: '',
                    medals: [
                        {
                            icon: 'balancer',
                            title: 'Balancer'
                        },
                        {
                            icon: 'red',
                            title: 'First blood! first closed tick as good or better'
                        }
                    ]
                }
            ]);

            localStorageService.set(tickPlanDataKey, {
                id: shortid.gen(),
                plannedValue: 12345.67,
                spreadValue: 1234.5,
                unspreadValue: 123.45,
                spreadPercent: 12.34,
                unspreadPercent: 56.78,
                factedPercent: 45,
                factedId: shortid.gen(),
                spread: [
                    {
                        jugName: 'jug-' + shortid.gen(),
                        jugDefaultPercent: 51,
                        jugValue: 4321.05,
                        jugPercent: 43.21
                    },
                    {
                        jugName: 'jug-' + shortid.gen(),
                        jugDefaultPercent: 52,
                        jugValue: 4321.06,
                        jugPercent: 43.2
                    }
                ]
            })
        });
})();