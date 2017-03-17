(function () {
    'use strict';

    angular.module('acc')
        .controller('PlanMenuController', PlanMenuController);

    function PlanMenuController(tickPlanService) {
        const ctrl = this;

        angular.extend(ctrl, {});

        ctrl.$onInit = function () {

        };

        ctrl.$onChanges = function (change) {
            const updatedData = tickPlanService
                .retrievePlanMenuDataFrom(change.planMenuData.currentValue);
            angular.extend(ctrl, updatedData);
            console.log('PlanMenuController $onChanges change', change);
        }
    }
})();