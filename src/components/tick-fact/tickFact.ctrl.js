(function () {
    'use strict';

    angular.module('acc')
        .controller('TickFactController', TickFactController);

    function TickFactController($state, round2, tickFactService, headerService) {
        const ctrl = this;

        const tickFactDataQ = tickFactService.getTickFactData($state.params.id);

        angular.extend(ctrl, {
            tickFactData: [],
            commonSpread: [],
            updateFactedMenuData,
            saveTickFact,
            clearTickFact
        });

        const trashBinActionId = headerService.registerTrashBinAction(function () {
            console.log('I am trash bin action from tick fact');
            clearTickFact();
        });

        ctrl.$onInit = function () {
            tickFactDataQ
                .then((tickFactData) => {
                    ctrl.tickFactData = tickFactData;
                    console.log('ctrl.tickFactData', ctrl.tickFactData);

                    ctrl.commonSpread = tickFactService.buildCommonSpread(ctrl.tickFactData.spread);
                })
                .catch((err) => {
                    console.log(`Error on getting tick by id ${$state.params.id}:`, err.data);
                    $state.go('tick-desk');
                });
        };

        ctrl.$onDestroy = function () {
            headerService.unregisterTrashBinAction(trashBinActionId);
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

        function clearTickFact() {
            ctrl.tickFactData.factedValue = 0;
            ctrl.tickFactData.factedPercent = 0;
            ctrl.tickFactData.spread.forEach((item) => {
                item.factedValue = 0;
                item.factedPercent = 0;
            });

            tickFactService.saveTick($state.params.id, ctrl.tickFactData)
                .then((resData) => {
                    console.log('resData', resData);
                    $state.go('tick-plan', {id: $state.params.id});
                });
        }
    }
})();