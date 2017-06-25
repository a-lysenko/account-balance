(function () {
    'use strict';

    angular.module('acc')
        .controller('TickPlanController', TickPlanController);

    function TickPlanController($state, round2, tickPlanService) {
        const ctrl = this;

        let trashBinActionId;

        angular.extend(ctrl, {
            //isTickNew: false,
            tickPlanData: {},
            commonSpread: [],

            saveTickPlan,
            removeTick,
            goToTickFact,
            handlePlannedValueChange,
            updatePlannedValue
        });

        ctrl.$onInit = function () {
            const tickPlanDataQ = tickPlanService.getTickPlanData({
                isTickNew: ctrl.isTickNew,
                id: $state.params.id
            });

            tickPlanDataQ
                .then((tickPlanData) => {
                    ctrl.tickPlanData = tickPlanData;
                    console.log('ctrl.tickPlanData', ctrl.tickPlanData);

                    // TODO - it is not todo. This approach let user have a fallback changes
                    ctrl.commonSpread = tickPlanService.buildCommonSpread(ctrl.tickPlanData.spread);
                })
                .catch((err) => {
                    console.log(`Error on getting tick by id ${$state.params.id}:`, err.data);
                    $state.go('tick-desk');
                });
        };

        function saveTickPlan() {
            const options = {
                isTickNew: ctrl.isTickNew,
                id: $state.params.id
            };

            ctrl.tickPlanData.spread = tickPlanService.compilePlannedDataSpread(
                ctrl.tickPlanData.spread,
                ctrl.commonSpread
            );

            tickPlanService.saveTick(options, ctrl.tickPlanData)
                .then((resData) => {
                	const stateGoOptions = {
                		location: true
                	};
                	
		            if (ctrl.isTickNew) {
		            	stateGoOptions.location = 'replace';
		            }

                    console.log('resData', resData);
                    $state.go('tick-desk', {} , stateGoOptions);
                });
        }

        function removeTick() {
            tickPlanService.removeTick($state.params.id)
                .then((resData) => {
                    console.log('resData', resData);
                    $state.go('tick-desk', {}, {location: 'replace'});
                });
        }

        function goToTickFact() {
            $state.go('tick-fact', {id: $state.params.id});
        }

        function handlePlannedValueChange(plannedValue) {
            console.log('handlePlannedValueChange call', plannedValue);
            updatePlannedValue(plannedValue);
        }

        function updatePlannedValue(summary) {
            summary = round2(summary);
            ctrl.tickPlanData.plannedValue = summary;
        }
    }
})();