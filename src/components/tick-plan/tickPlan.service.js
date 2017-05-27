(function () {
    'use strict';
    angular.module('acc')
        .factory('tickPlanService', tickPlanService);

    function tickPlanService(tickService) {
        return {
            getTickPlanData,
            retrievePlanMenuDataFrom,
            saveTick
        };

        function getTickPlanData({id, isTickNew}) {
            return tickService.getTickData({id, isTickNew})
                .then(buildTickPlanData);

            function buildTickPlanData(tickData) {
                const tickPlanData = {};

                // actually do nothing
                Object.assign(tickPlanData, tickData);

                return tickPlanData;
            }
        }

        function retrievePlanMenuDataFrom(data) {
            return {
                plannedValue: data.plannedValue || 0,
                unspreadValue: data.unspreadValue || 0,
                unspreadPercent: data.unspreadPercent || 0
            };
        }

        function saveTick({id, isTickNew}, data) {
            return tickService.saveTick({id, isTickNew}, data);
        }
    }
})();