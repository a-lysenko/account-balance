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
            },
            update: {
                method: 'PUT',
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
            saveTick,
            round2
        };

        function getTickPlanData(id) {
            let tickPlanDataQ;

            if (isTickNew(id)) {
                tickPlanDataQ = tickNewRes.get()
                    .$promise.then((tickNew) => {
                        return Object.assign({}, emptyData, tickNew);
                    });
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

        function saveTick(id, data) {
            let tickDataQ;

            if (isTickNew(id)) {
                tickDataQ = saveNewTick(data);
            } else {
                tickDataQ = updateTick(id, data);
            }
            return tickDataQ;
        }

        function saveNewTick(tickData) {
            return tickNewRes.add({}, tickData).$promise;
        }

        function updateTick(tickId, tickData) {
            return tickPlanDataRes.update({id: tickId}, tickData).$promise;
        }

        function round2(value) {
            return Math.round(value * 100) / 100;
        }
    }
})();