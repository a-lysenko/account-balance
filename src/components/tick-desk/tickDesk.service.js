(function () {
    'use strict';
    angular.module('acc')
        .factory('tickDeskService', tickDeskService);

    function tickDeskService($resource) {
        const tickDeskDataRes = $resource('tick-desk-data', {}, {
            get: {
                method: 'GET',
                params: {
                    id: ''
                },
                isArray: true
            }
        });

        return {
            getTickDeskData: getTickDeskData
        };

        function getTickDeskData(id) {
            const tickDeskDataQ = tickDeskDataRes.get()
                .$promise;

            return tickDeskDataQ;
        }
    }
})();