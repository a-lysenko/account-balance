(function () {
    'use strict';
    angular.module('acc')
        .factory('tickPlanService', tickPlanService);

    function tickPlanService($q, $resource) {
        // TODO - set default spread
        const emptyData = {
            id: undefined,
            plannedValue: 0,
            spreadValue: 0,
            unspreadValue: 0,
            spreadPercent: 0,
            unspreadPercent: 0,
            factedPercent: 0,
            spread: [
                {
                    jugName: 'jug-' + shortid.gen().slice(-2),
                    jugDefaultPercent: 51,
                    jugValue: 0,
                    jugPercent: 0
                },
                {
                    jugName: 'jug-' + shortid.gen().slice(-2),
                    jugDefaultPercent: 52,
                    jugValue: 0,
                    jugPercent: 0
                }
            ]
        };

        const tickPlanDataRes = $resource('tick-plan-data', {}, {
            get: {
                method: 'GET',
                params: {
                    id: ''
                },
                url: 'tick-plan-data/:id',
                isArray: false
            }
        });

        return {
            getTickPlanData,
            retrievePlanMenuDataFrom,
            isTickNew
        };

        function getTickPlanData(id) {
            let tickPlanDataQ;

            if (isTickNew(id)) {
                tickPlanDataQ = $q.resolve(angular.copy(emptyData));
            } else {
                tickPlanDataQ = tickPlanDataRes.get({id: id})
                    .$promise;
            }
            return tickPlanDataQ;
        }

        function retrievePlanMenuDataFrom(data) {
            const propsToCopy = [
                'plannedValue',
                'spreadValue',
                'unspreadValue',
                'spreadPercent',
                'unspreadPercent'
            ];

            return propsToCopy.reduce((planMenuData, propName) => {
                planMenuData[propName] = data[propName];

                return planMenuData;
            }, {});
        }

        function isTickNew(id) {
            return id === 'new';
        }
    }
})();