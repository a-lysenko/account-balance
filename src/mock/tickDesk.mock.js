(function () {
    'use strict';
    angular.module('acc')
        .factory('mockInterceptor', mockInterceptor)
        .config(function ($httpProvider) {
            $httpProvider.interceptors.push('mockInterceptor');
        });

        function mockInterceptor(shortid) {
            console.info('Mock tickDesk data included in build due to "src/mock/**/*.mock.js" pattern.');

            return {
                request: function (config) {
                    if (config.url === 'tick-desk-data') {
                        config.headers['is-mock'] = true;

                        console.log('Intercepted. config', config);
                        console.log('arguments', arguments);
                    }

                    return config;
                },

                responseError: function(rejection) {
                    const deskDataKey = [
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
                    ];

                    if (rejection.config.headers['is-mock']
                        && 'tick-desk-data' === rejection.config.url) {

                        rejection.status = 200;
                        rejection.data = deskDataKey;

                        return rejection;
                    }
                    console.log('responseError Intercepted. rejection', rejection);
                    return rejection;
                }
            };
        }
})();