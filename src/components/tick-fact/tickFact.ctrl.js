(function () {
    'use strict';

    angular.module('acc')
        .controller('TickFactController', TickFactController);

    function TickFactController($state, tickFactService) {
        const ctrl = this;

        const tickFactDataQ = tickFactService.getTickFactData($state.params.id);

        angular.extend(ctrl, {
            tickFactData: [],
            commonSpread: [],

            saveTickFact: saveTickFact
        });

        ctrl.$onInit = function () {
            tickFactDataQ.then((tickFactData) => {
                ctrl.tickFactData = tickFactData;
                console.log('ctrl.tickFactData', ctrl.tickFactData);

                ctrl.commonSpread = tickFactService.buildCommonSpread(ctrl.tickFactData.spread);
            });
        };

        function saveTickFact() {
            console.log('saveTickFact called');
        }
    }
})();