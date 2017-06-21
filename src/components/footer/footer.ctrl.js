(function () {
    'use strict';

    angular.module('acc')
        .controller('FooterController', FooterController);

    function FooterController() {
        const ctrl = this;
        angular.extend(ctrl, {
            isSave: false,
            isAdd: false
        });

        ctrl.$onInit = function () {
            ctrl.isSave = !!ctrl.save;
            ctrl.isAdd = !!ctrl.add;

            ctrl.go();
        };
    }
})();