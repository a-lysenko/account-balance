(function () {
    'use strict';

    angular.module('acc')
        .controller('FooterController', FooterController);

    function FooterController() {
        const ctrl = this;
        angular.extend(ctrl, {
            isRemove: false,
            isGo: false,
            isRemovePanelActive: false,

            showRemovePanel,
            hideRemovePanel
        });

        ctrl.$onInit = function () {
            ctrl.isRemove = !!ctrl.remove;
            ctrl.isGo = !!ctrl.go;
        };

        function showRemovePanel() {
            ctrl.isRemovePanelActive = true;
        }

        function hideRemovePanel() {
            ctrl.isRemovePanelActive = false;
        }
    }
})();