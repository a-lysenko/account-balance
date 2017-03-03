(function () {
    'use strict';
    angular.module('acc')
        .factory('tickDeskService', tickDeskService);

    function tickDeskService($q, localStorageService, tickDeskDataKey) {

        return {
            getTickDeskData: getTickDeskData
        };

        function getTickDeskData() {
            const tickDeskData = localStorageService.get(tickDeskDataKey);
            return $q.resolve(tickDeskData);
        }
    }
})();