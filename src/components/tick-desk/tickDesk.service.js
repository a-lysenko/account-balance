(function () {
    'use strict';
    angular.module('acc')
        .factory('tickDeskService', tickDeskService);

    function tickDeskService($resource) {
        const tickDeskDataRes = $resource('tick-desk-data', {}, {
            get: {
                method: 'GET',
                isArray: true
            }
        });

        return {
            getTickDeskData: getTickDeskData
        };

        function getTickDeskData() {
            const tickDeskDataQ = tickDeskDataRes.get()
                .$promise;

            return tickDeskDataQ;
        }
    }
})();