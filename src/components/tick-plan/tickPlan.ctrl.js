(function () {
    'use strict';

    angular.module('acc')
        .controller('TickPlanController', TickPlanController);

    function TickPlanController($state, tickPlanService) {
        const ctrl = this;

        const tickPlanDataQ = tickPlanService.getTickPlanData($state.params.id);

        angular.extend(ctrl, {
            tickPlanData: [],
            tickPlanned: {},

            saveTickPlan: saveTickPlan
        });

        ctrl.$onInit = function () {
            tickPlanDataQ.then((tickPlanData) => {
                ctrl.tickPlanData = tickPlanData;
                console.log('ctrl.tickPlanData', ctrl.tickPlanData);

                // TODO - name of function is inconsistent. But renaming
                // tickPlanData -> tickData
                // tickPlanned -> tickPlanData is planned
                ctrl.tickPlanned = getTickPlanData(ctrl.tickPlanData);
            });
        };

        function saveTickPlan() {
            console.log('saveTickPlan called');
        }

        function getTickPlanData(tickData) {
            const propsToCopy = [
                'plannedValue',
                'spreadValue',
                'unspreadValue',
                'spreadPercent',
                'unspreadPercent'
            ];

            return propsToCopy.reduce((acc, propName) => {
                acc[propName] = tickData[propName];

                return acc;
            }, {});
        }
    }
})();