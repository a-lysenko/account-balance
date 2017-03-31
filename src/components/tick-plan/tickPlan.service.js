(function () {
    'use strict';
    angular.module('acc')
        .factory('tickPlanService', tickPlanService);

    function tickPlanService($q, $resource) {
        // TODO - set default spread
        const emptyData = {
            id: undefined,
            plannedValue: 0,
            factedPercent: 0
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

        const tickNewRes = $resource('tick-new', {}, {
            get: {
                method: 'GET',
                isArray: false
            },
            add: {
                method: 'POST',
                isArray: false
            }
        });

        return {
            getTickPlanData,
            retrievePlanMenuDataFrom,
            isTickNew,
            saveNewTick,
            round2
        };

        function getTickPlanData(id) {
            let tickPlanDataQ;

            if (isTickNew(id)) {
                tickPlanDataQ = tickNewRes.get()
                    .$promise.then((tickNew) => {
                        return Object.assign({}, emptyData, tickNew);
                    });
                $q.resolve(angular.copy(emptyData));
            } else {
                tickPlanDataQ = tickPlanDataRes.get({id: id})
                    .$promise;
            }
            return tickPlanDataQ;
        }

        function retrievePlanMenuDataFrom(data) {
            return {
                plannedValue: data.plannedValue,
                unspreadValue: data.unspreadValue || 0,
                unspreadPercent: data.unspreadPercent || 0
            };
        }

        function isTickNew(id) {
            return id === 'new';
        }

        function saveNewTick(tickData) {
            return tickNewRes.add({}, tickData).$promise;
        }

        function round2(value) {
            return Math.round(value * 100) / 100;
        }
    }
})();