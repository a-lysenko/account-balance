(function () {
    'use strict';
    angular.module('acc')
        .run(function (localStorageService, tickDeskDataKey, shortid) {
            console.info('Mock tickDesk data included in build due to "src/mock/**/*.mock.js" pattern.');

            localStorageService.set(tickDeskDataKey, [
                {
                    id: shortid.gen(),
                    plannedDate: new Date(),
                    factedDate: new Date(),
                    plannedValue: 12345.67,
                    factedValue: 1234.56,
                    factedPercent: 17,
                    achievements: {
                        balancer: {
                            icon: 'violet',
                            title: 'Balancer'
                        },
                        progress: {
                            value: 'great'
                        },
                        row: {
                            icon: 'gold',
                            title: '3 good or better in row'
                        }
                    }
                },
                {
                    id: shortid.gen(),
                    plannedDate: new Date(),
                    factedDate: new Date(),
                    plannedValue: 12345.67,
                    factedValue: 1234.56,
                    factedPercent: 17,
                    achievements: {
                        progress: {
                            value: 'good'
                        },
                        row: {
                            icon: 'gold',
                            title: '3 good or better in row'
                        }
                    }
                },
                {
                    id: shortid.gen(),
                    plannedDate: new Date(),
                    factedDate: new Date(),
                    plannedValue: 12345.67,
                    factedValue: 1234.56,
                    factedPercent: 17,
                    achievements: {
                        progress: {
                            value: 'poor'
                        }
                    }
                },
                {
                    id: shortid.gen(),
                    plannedDate: new Date(),
                    factedDate: new Date(),
                    plannedValue: 12345.67,
                    factedValue: 1234.56,
                    factedPercent: 17,
                    achievements: {
                        balancer: {
                            icon: 'violet',
                            title: 'Balancer'
                        },
                        firstBlood: {
                            icon: 'red',
                            title: 'first closed tick as good or better'
                        }
                    }
                }
            ]);
        });
})();