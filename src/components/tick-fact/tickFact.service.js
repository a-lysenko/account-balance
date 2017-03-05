(function () {
    'use strict';
    angular.module('acc')
        .factory('tickFactService', tickFactService);

    function tickFactService($resource) {
        const tickFactDataRes = $resource('tick-fact-data', {}, {
            get: {
                method: 'GET',
                params: {
                    id: ''
                },
                url: 'tick-fact-data/:id',
                isArray: false
            }
        });

        return {
            getTickFactData: getTickFactData
        };

        function getTickFactData(id) {
            const tickFactDataQ = tickFactDataRes.get({id: id})
                .$promise;

            return tickFactDataQ;
        }
    }
})();