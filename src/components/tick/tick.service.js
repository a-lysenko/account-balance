(function () {
    'use strict';
    angular.module('acc')
        .factory('tickService', tickService);

    function tickService($q, $resource) {
        const tickDataResource = $resource('tick', {}, {
            get: {
                method: 'GET',
                params: {
                    id: ''
                },
                url: 'tick/:id',
                isArray: false
            },
            update: {
                method: 'PUT',
                params: {
                    id: ''
                },
                url: 'tick/:id',
                isArray: false
            },
            remove: {
                method: 'DELETE',
                params: {
                    id: ''
                },
                url: 'tick/:id',
                isArray: false
            }
        });

        const tickNewResource = $resource('tick-new', {}, {
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
            getTickData,
            saveTick,
            round2
        };

        function getTickData({id, isTickNew}) {
            let tickPlanDataQ;

            if (isTickNew) {
                tickPlanDataQ = tickNewResource.get()
                    .$promise;
            } else {
                tickPlanDataQ = tickDataResource.get({id: id})
                    .$promise;
            }
            return tickPlanDataQ;
        }

        function saveTick({id, isTickNew}, data) {
            let tickDataQ;

            if (isTickNew) {
                tickDataQ = saveNewTick(data);
            } else {
                tickDataQ = updateTick(id, data);
            }
            return tickDataQ;
        }

        function saveNewTick(tickData) {
            return tickNewResource.add({}, tickData).$promise;
        }

        function updateTick(tickId, tickData) {
            return tickDataResource.update({id: tickId}, tickData).$promise;
        }

        // TODO - move to separate common module
        function round2(value) {
            return Math.round(value * 100) / 100;
        }
    }
})();