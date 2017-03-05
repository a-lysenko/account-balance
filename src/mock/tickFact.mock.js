(function () {
    'use strict';
    angular.module('acc')
        .factory('mockFactInterceptor', mockFactInterceptor)
        .config(function ($httpProvider) {
            $httpProvider.interceptors.push('mockFactInterceptor');
        });

    function mockFactInterceptor($q, shortid) {
        console.info('Mock tickFact data included in build due to "src/mock/**/*.mock.js" pattern.');

        return {
            request: function (config) {
                if (config.url === 'tick-fact-data') {
                    config.headers['is-mock'] = true;

                    console.log('url: tick-desk-data. request Intercepted. config', config);
                    console.log('arguments', arguments);
                }

                return config;
            },

            responseError: function (rejection) {
                const mockFactData = {
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
                };

                if (rejection.config.headers['is-mock']
                    && 'tick-fact-data' === rejection.config.url) {
                    console.log('url: tick-fact-data. responseError Intercepted. rejection', rejection);

                    rejection.status = 200;
                    rejection.data = mockFactData;

                    return rejection;
                }

                return $q.reject(rejection);
            }
        };
    }
})();