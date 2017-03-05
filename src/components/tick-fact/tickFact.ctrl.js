(function () {
    'use strict';

    angular.module('acc')
        .controller('TickFactController', TickFactController);

    function TickFactController(tickFactService) {
        const ctrl = this;
        // TODO - pass id here
        const tickFactDataQ = tickFactService.getTickFactData();

        angular.extend(ctrl, {
            tickFactData: [],

            saveTickFact: saveTickFact
        });

        ctrl.$onInit = function () {
            tickFactDataQ.then((tickFactData) => {
                ctrl.tickFactData = tickFactData;
                console.log('ctrl.tickFactData', ctrl.tickFactData);
            });
        };

        function saveTickFact() {
            console.log('saveTickFact called');
        }
    }
})();