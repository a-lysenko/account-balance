(function () {
    'use strict';
    angular.module('acc')
        .factory('tickFactService', tickFactService);

    function tickFactService(tickService) {

        return {
            getTickFactData,
            saveTick
        };

        function getTickFactData(id) {
            return tickService.getTickData({
                id,
                isTickNew: false
            })
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