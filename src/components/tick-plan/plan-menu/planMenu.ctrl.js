(function () {
    'use strict';

    angular.module('acc')
        .controller('PlanMenuController', PlanMenuController);

    function PlanMenuController() {
        const ctrl = this;

        angular.extend(ctrl, {
            initEditPanelIsActive: undefined,
            editPanelIsActive: false,

            openEditPanel,
            closeEditPanel
        });

        ctrl.$onInit = function () {
            ctrl.editPanelIsActive = ctrl.initEditPanelIsActive;
        };

        ctrl.$onChanges = function (change) {
            console.log('PlanMenuController $onChanges change', change);
        };

        function openEditPanel() {
            ctrl.editPanelIsActive = true;
        }

        function closeEditPanel() {
            if (ctrl.editPanelForm.plannedValue.$valid) {
                ctrl.editPanelIsActive = false;

                ctrl.onPlannedSumEditEnd({
                    plannedValue: ctrl.plannedValue
                });
            } else {
                console.log('Invalid planned value!');
            }
        }
    }
})();