(function () {
    'use strict';
    angular.module('acc')
        .factory('tickFactService', tickFactService);

    function tickFactService(tickService) {

        return {
            getTickFactData,
            buildCommonSpread,
            saveTick
        };

        function getTickFactData(id) {
            return tickService.getTickData({
                id,
                isTickNew: false
            })
        }

        function buildCommonSpread(factedDataSpread) {
            return factedDataSpread.map((item) => {
                return {
                    name: item.name,
                    defaultPercent: item.defaultPercent,
                    value: item.factedValue,
                    percent: item.factedPercent
                }
            });
        }

        function compileFactedDataSpread(factedDataSpread, commonSpread) {
            return factedDataSpread.map((factedDataSpreadItem, index) => {
                const item = Object.assign({}, factedDataSpreadItem);
                const {value, percent} = commonSpread[index];

                item.factedValue = value;
                item.factedPercent = percent;

                return item;
            });
        }

        function saveTick({id}, data) {
            const options = {
                id,
                isTickNew: false
            };
            return tickService.saveTick(options, data);
        }
    }
})();