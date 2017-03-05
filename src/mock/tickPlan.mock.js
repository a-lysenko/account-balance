(function () {
    'use strict';
    angular.module('acc')
        .factory('mockPlanInterceptor', mockPlanInterceptor)
        .config(function ($httpProvider) {
            $httpProvider.interceptors.push('mockPlanInterceptor');
        });

    function mockPlanInterceptor($q, shortid) {
        console.info('Mock tickPlan data included in build due to "src/mock/**/*.mock.js" pattern.');

        return {
            request: function (config) {
                if (config.url === 'tick-plan-data') {
                    config.headers['is-mock'] = true;

                    console.log('url: tick-desk-data. request Intercepted. config', config);
                    console.log('arguments', arguments);
                }

                return config;
            },

            responseError: function (rejection) {
                const mockPlanData = {
                    id: shortid.gen(),
                    plannedValue: 12345.67,
                    spreadValue: 1234.5,
                    unspreadValue: 123.45,
                    spreadPercent: 12.34,
                    unspreadPercent: 56.78,
                    factedPercent: 46,
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
                };

                if (rejection.config.headers['is-mock']
                    && 'tick-plan-data' === rejection.config.url) {
                    console.log('url: tick-plan-data. responseError Intercepted. rejection', rejection);

                    rejection.status = 200;
                    rejection.data = mockPlanData;

                    return rejection;
                }

                return $q.reject(rejection);
            }
        };
    }
})();