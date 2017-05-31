(function () {
    'use strict';
    angular.module('acc')
        .factory('tickPlanService', tickPlanService);

    function tickPlanService(tickService) {
        return {
            getTickPlanData,
            retrievePlanMenuDataFrom,
            buildCommonSpread,
            compilePlannedDataSpread,
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
                plannedValue: data.plannedValue || 0
            };
        }

        function buildCommonSpread(plannedDataSpread) {
            return plannedDataSpread.map((item) => {
                return {
                    name: item.name,
                    defaultPercent: item.defaultPercent,
                    value: item.plannedValue,
                    percent: item.plannedPercent
                }
            });
        }

        function compilePlannedDataSpread(plannedDataSpread, commonSpread) {
            return plannedDataSpread.map((plannedDataSpreadItem, index) => {
                const item = Object.assign({}, plannedDataSpreadItem);
                const {value, percent} = commonSpread[index];

                item.plannedValue = value;
                item.plannedPercent = percent;

                return item;
            });
        }

        function saveTick({id, isTickNew}, data) {
            return tickService.saveTick({id, isTickNew}, data);
        }
    }
})();