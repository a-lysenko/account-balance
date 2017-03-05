(function () {
    'use strict';
    angular.module('acc')
        .factory('tickPlanService', tickPlanService);

    function tickPlanService($resource) {
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
            getTickPlanData: getTickPlanData
        };

        function getTickPlanData(id) {
            const tickPlanDataQ = tickPlanDataRes.get({id: id})
                .$promise;

            return tickPlanDataQ;
        }
    }
})();