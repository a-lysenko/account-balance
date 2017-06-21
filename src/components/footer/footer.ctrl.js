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

            isRemoveBtnDisplayed,
            isGoBtnDisplayed,
            showRemovePanel,
            hideRemovePanel
        });

        ctrl.$onInit = function () {
            definePassedHandlers({
                remove: ctrl.remove,
                go: ctrl.go
            });

            updateButtonsStyle();
        };

        ctrl.$onChanges = function (changes) {
            if (changes.remove || changes.go) {
                definePassedHandlers(changes);
            }

            if (Object.keys(changes).length) {
                updateButtonsStyle();
            }
        };

        function definePassedHandlers({remove, go}) {
            ctrl.isRemove = !!remove;
            ctrl.isGo = !!go;
        }

        function updateButtonsStyle() {
            const amountOfAllowedButtons = 1 +
                (+isRemoveBtnDisplayed()) +
                (+isGoBtnDisplayed());

            ctrl.halfScreenButtons = (amountOfAllowedButtons === 2);
            ctrl.fullScreenButtons = (amountOfAllowedButtons === 1);
        }

        function isRemoveBtnDisplayed() {
            return !ctrl.hideRemove && ctrl.isRemove;
        }

        function isGoBtnDisplayed() {
            return !ctrl.hideGo && ctrl.isGo;
        }

        function showRemovePanel() {
            ctrl.isRemovePanelActive = true;
        }

        function hideRemovePanel() {
            ctrl.isRemovePanelActive = false;
        }
    }
})();