(function () {
    'use strict';

    angular.module('acc')
        .controller('HeaderController', HeaderController);

    function HeaderController(headerService) {
        const ctrl = this;
        angular.extend(ctrl, {
            fireTrashBinActions: headerService.fireTrashBinActions,
            hasActions: headerService.hasActions
        });
    }
})();