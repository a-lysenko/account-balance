(function () {
    'use strict';

    angular.module('acc')
        .controller('PlanMenuController', PlanMenuController);

    function PlanMenuController(tickPlanService) {
        const ctrl = this;

        angular.extend(ctrl, {
            initEditPanelIsActive: undefined,
            editPanelIsActive: false,

            openEditPanel,
            closeEditPanel
        });

        ctrl.$onInit = function () {
            ctrl.editPanelIsActive = ctrl.initEditPanelIsActive;
            console.log('ctrl.editPanelIsActive', ctrl.editPanelIsActive);
        };

        ctrl.$onChanges = function (change) {
            const updatedData = tickPlanService
                .retrievePlanMenuDataFrom(change.planMenuData.currentValue);
            angular.extend(ctrl, updatedData);
            console.log('PlanMenuController $onChanges change', change);
        };

        function openEditPanel() {
            ctrl.editPanelIsActive = true;
            console.log('!!ctrl.editPanelIsActive', ctrl.editPanelIsActive);

        }

        function closeEditPanel() {
            ctrl.editPanelIsActive = false;

            ctrl.onPlannedSumEditEnd({
                plannedValue: ctrl.plannedValue
            });
        }
    }
})();