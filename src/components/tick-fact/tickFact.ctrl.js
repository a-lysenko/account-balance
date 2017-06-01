(function () {
    'use strict';

    angular.module('acc')
        .controller('TickFactController', TickFactController);

    function TickFactController($state, round2, tickFactService) {
        const ctrl = this;

        const tickFactDataQ = tickFactService.getTickFactData($state.params.id);

        angular.extend(ctrl, {
            tickFactData: [],
            commonSpread: [],
            updateFactedMenuData,
            saveTickFact
        });

        ctrl.$onInit = function () {
            tickFactDataQ.then((tickFactData) => {
                ctrl.tickFactData = tickFactData;
                console.log('ctrl.tickFactData', ctrl.tickFactData);

                ctrl.commonSpread = tickFactService.buildCommonSpread(ctrl.tickFactData.spread);
            });
        };

        function updateFactedMenuData(summary) {
            summary = round2(summary);
            ctrl.tickFactData.factedValue = summary;
            ctrl.tickFactData.factedPercent = round2(ctrl.tickFactData.factedValue / ctrl.tickFactData.plannedValue * 100);
        }

        function saveTickFact() {
            ctrl.tickFactData.spread = tickFactService.compileFactedDataSpread(
                ctrl.tickFactData.spread,
                ctrl.commonSpread
            );

            tickFactService.saveTick($state.params.id, ctrl.tickFactData)
                .then((resData) => {
                    console.log('resData', resData);
                    $state.go('tick-desk');
                });
        }
    }
})();